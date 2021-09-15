using Newtonsoft.Json.Linq;

namespace ClientGenerator
{
    class EndpointDto
    {
        public string[] Tags { get; set; }
        public string OperationId { get; set; }
        public string[] Consumes { get; set; }
        public string[] Produces { get; set; }
        public EndpointParamDto[] Parameters { get; set; }
        public EndpointResponseDtoSchemaWrapper RequestBody { get; set; }
        public JObject Responses { get; set; }
        public EndpointResponseDto GetResponse()
        {
            try
            {
                var response = Responses["200"] as JObject;
                var schemaWrapper = response.ToObject<EndpointResponseDtoSchemaWrapper>();
                return schemaWrapper.Content["application/json"];
            }
            catch
            {
                return null;
            }
        }

        public EndpointResponseDtoSchema GetRequestBodyParameters()
        {
            try
            {
                var parameters = RequestBody.Content["application/json"];
                return parameters.Schema;
            }
            catch
            {
                return null;
            }
        }
    }
}
