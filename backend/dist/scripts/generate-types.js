"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_schema_to_typescript_1 = require("json-schema-to-typescript");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const inputDir = path_1.default.join(__dirname, "../../generated/json");
console.log(inputDir);
const outputDir = path_1.default.join(__dirname, "../../generated/types");
console.log(outputDir);
if (!fs_1.default.existsSync(outputDir))
    fs_1.default.mkdirSync(outputDir, { recursive: true });
for (const file of fs_1.default.readdirSync(inputDir)) {
    if (!file.endsWith(".json"))
        continue;
    const modelName = file.replace(".json", "");
    const inputPath = path_1.default.join(inputDir, file);
    const outputPath = path_1.default.join(outputDir, `${modelName}.d.ts`);
    (0, json_schema_to_typescript_1.compileFromFile)(inputPath, { bannerComment: "" }).then(ts => {
        fs_1.default.writeFileSync(outputPath, ts);
        console.log(`Generated: ${outputPath}`);
    });
}
