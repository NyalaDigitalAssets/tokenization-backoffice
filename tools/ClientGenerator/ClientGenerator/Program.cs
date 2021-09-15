using System;
using System.Linq;

namespace ClientGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(string.Join(",", args));
            if (args.Length != 2)
            {
                Console.WriteLine($"Required 2 arguments, {args.Length} arguments received. Arg 1 = baseUrl e.g. http://127.0.0.1:5555/swagger/v1/swagger.json. Arg 2 = pathToSaveTo e.g. ../../../src/Europa/Kapilendo.Custodian.Website.Spa/src/app/core/services/custodian-api.service.ts");
                throw new ArgumentException();
            }
            var baseUrl = args[0];
            var pathToSaveTo = args[1];
            var reader = new SwaggerReader(baseUrl, pathToSaveTo);
            reader.Read();
        }
    }
}
