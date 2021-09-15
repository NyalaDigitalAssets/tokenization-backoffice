import { generateModels } from './index';
console.log(process.argv);
const url = process.argv[2]
const modelPath = process.argv[3]
const enumPath = process.argv[4]
generateModels('swagger-website.json',
    url,
    modelPath,
    enumPath
);
