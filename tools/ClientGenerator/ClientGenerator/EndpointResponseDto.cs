using System.Collections.Generic;

namespace ClientGenerator
{
    public class EndpointResponseDtoSchemaWrapper
    {
        public Dictionary<string, EndpointResponseDto> Content { get; set; }
    }

    public class EndpointResponseDto
    {
        public EndpointResponseDtoSchema Schema { get; set; }
    }

    public class EndpointResponseDtoSchema
    {
        public string Ref { get; set; }
        public string Type { get; set; }
        public EndpointResponseArrayItemDtoSchema Items { get; set; }
    }

    public class EndpointResponseArrayItemDtoSchema
    {
        public string Ref { get; set; }
        public string Type { get; set; }
    }
}
