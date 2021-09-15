namespace ClientGenerator
{
    public class EndpointParamDto
    {
        public string Name { get; set; }
        public string In{ get;set;}
        public bool Required { get; set; }
        public string Format { get; set; }
        public EndpointParamDtoSchema Schema { get; set; }
    }

    public class EndpointParamDtoSchema
    {
        public string Type { get; set; }
    }
}

