using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ClientGenerator
{
    public class SwaggerReader
    {
        private readonly string _baseUrl;
        private readonly string _pathToSaveTo;

        public SwaggerReader(string baseUrl, string pathToSaveTo)
        {
            _baseUrl = baseUrl;
            _pathToSaveTo = pathToSaveTo;
        }

        public static List<string> AllModels = new List<string>();

        public void Read()
        {
            var allEndpoints = Task.Run(async () => await GetEndpointsData()).Result;
            var printFunctionsData = GetPrintFunctionsData(allEndpoints);

            var sb = new StringBuilder();

            sb.AppendLine("import { Injectable } from '@angular/core';");
            sb.AppendLine("import { Observable } from 'rxjs';");
            sb.AppendLine("import { ApiService } from './api.service';");
            sb.AppendLine($"import {{");
            AllModels.ForEach(m => sb.AppendLine($"    {m},"));
            sb.AppendLine($"}} from '../models';");
            sb.AppendLine();

            sb.AppendLine("@Injectable({");
            sb.AppendLine("    providedIn: 'root'");
            sb.AppendLine("})");
            sb.AppendLine("export class CustomApiService {");
            sb.AppendLine("    constructor(private apiService: ApiService) { }");
            sb.AppendLine();

            foreach (var data in printFunctionsData)
            {
                if (!data.PathTemplate.StartsWith("/api/"))
                    continue;

                data.Params.Add(("showLoading", "boolean = true"));
                data.Params.Add(("handleErrorGlobally", "boolean = true"));

                var inputParamsString = string.Join(", ", data.Params.Select(p => $"{p.name}: {p.type}"));

                var endpoint = $"    {data.HttpVerb}{data.ControllerName.Replace(" ", string.Empty)}{data.MethodName} = ({inputParamsString}): Observable<{data.Response}> =>";

                if (data.HttpVerb == "post" || data.HttpVerb == "put" || data.HttpVerb == "patch")
                {
                    var bodyParamType = (data.BodyParam == default) ? "any" : data.BodyParam.type;
                    var bodyParamName = (data.BodyParam == default) ? "{}" : data.BodyParam.name;
                    endpoint += $" this.apiService.{data.HttpVerb}<{bodyParamType}, {data.Response}>({data.FullPath}, {bodyParamName}, showLoading, handleErrorGlobally);";
                }
                else
                    endpoint += $" this.apiService.{data.HttpVerb}<{data.Response}>({data.FullPath}, showLoading, handleErrorGlobally);";
                sb.AppendLine(endpoint);
            }

            sb.AppendLine("}");

            var output = sb.ToString();

            if (File.Exists(_pathToSaveTo))
                File.Delete(_pathToSaveTo);

            File.WriteAllText(_pathToSaveTo, output);
        }

        #region Private Methods

        private async Task<IEnumerable<(string path, string verb, EndpointDto data)>> GetEndpointsData()
        {
            string jsonText;

            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Get, _baseUrl);
                request.Headers.Add("Accept", "application/json");
                var response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                    jsonText = await response.Content.ReadAsStringAsync();
                else
                {
                    Console.WriteLine(response.ReasonPhrase);
                    throw new Exception("Generation failed");
                }
            }

            jsonText = jsonText.Replace("$ref", "ref");
            var json = JObject.Parse(jsonText);
            var paths = json["paths"] as JObject;

            var allEndpoints = new List<(string path, string verb, EndpointDto data)>();

            foreach (var pathObject in paths.Properties())
            {
                var path = pathObject.Name;
                var value = pathObject.Value as JObject;

                foreach (var child in value.Properties())
                {
                    var httpVerb = child.Name;
                    var endpointDtoString = child.Value.ToString();
                    var endpoint = JsonConvert.DeserializeObject<EndpointDto>(endpointDtoString,
                        new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.Objects });
                    allEndpoints.Add((path, httpVerb, endpoint));
                }
            }

            return allEndpoints;
        }

        private static IEnumerable<PrintFunctionVariablesDto> GetPrintFunctionsData(IEnumerable<(string path, string verb, EndpointDto data)> endpoints)
        {
            string TranslateType(string input, string items = null)
            {
                if (input == "integer")
                    return "number";
                if (input == "array")
                {
                    var type = GetTypeFromSchema(items);
                    return $"{type}[]";
                }

                return input;
            }

            string GetTypeFromSchema(string schema)
            {
                var type = schema.Split("/").Last();
                if (!AllModels.Contains(type))
                    AllModels.Add(type);
                return type;
            }

            var functions = new List<PrintFunctionVariablesDto>();
            foreach (var (path, verb, data) in endpoints)
            {
                var function = new PrintFunctionVariablesDto
                {
                    HttpVerb = verb,
                    ControllerName = data.Tags[0],
                    MethodName = data.OperationId,
                    PathTemplate = path,
                    FullPath = $"`{path}`",
                    Params = new List<(string name, string type)>()
                };

                if (data.Parameters != null)
                {
                    var routeParams = data.Parameters.Where(p => p.In == "path").ToList();

                    foreach (var p in routeParams)
                    {
                        var name = p.Name.Replace("-", "");
                        function.PathTemplate = function.PathTemplate.Replace($"{{{name}}}", $"${{{name}}}");
                        function.FullPath = function.FullPath.Replace($"{{{p.Name}}}", $"${{{name}}}");
                        function.Params.Add((name, TranslateType(p.Schema.Type)));
                    }
                }

                var bodyParamDto = data.GetRequestBodyParameters();

                if (bodyParamDto != null)
                {
                    var bodyParam = ("data", TranslateType(GetTypeFromSchema(bodyParamDto.Ref)));
                    function.BodyParam = bodyParam;
                    function.Params.Add(bodyParam);
                }

                if (verb == "get")
                {
                    function.Params.Add(("queryParams", "string = null"));
                    function.FullPath = $"queryParams ? `{function.PathTemplate}?${{queryParams}}` : {function.FullPath}";
                }

                function.Response = "any";
                var resp = data.GetResponse();
                if (!string.IsNullOrEmpty(resp?.Schema?.Ref))
                {
                    function.Response = GetTypeFromSchema(resp.Schema.Ref);
                }
                else if (!string.IsNullOrEmpty(resp?.Schema?.Type))
                {
                    if (resp.Schema.Items?.Ref != null || resp.Schema?.Type != "array") // this is for basic types and arrays of objects
                        function.Response = TranslateType(resp.Schema.Type, resp.Schema.Items?.Ref);
                    else // if (resp.Schema?.Type == "array") this is for arrays of primitives
                        function.Response = $"{resp.Schema.Items?.Type}[]";
                }

                functions.Add(function);
            }

            return functions;
        }

        #endregion
    }
}
