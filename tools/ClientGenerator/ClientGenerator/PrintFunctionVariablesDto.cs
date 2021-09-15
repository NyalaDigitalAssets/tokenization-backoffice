using System.Collections.Generic;

namespace ClientGenerator
{
    public class PrintFunctionVariablesDto
    {
        public string PathTemplate { get; set; }
        public string FullPath { get; set; }
        public string HttpVerb { get; set; }
        public string ControllerName { get; set; }
        public string MethodName { get; set; }
        public List<(string name, string type)> Params { get; set; }
        public (string name, string type) BodyParam { get; set; }
        public string Response { get; set; }
    }
}
