import { compileFromFile } from "json-schema-to-typescript";
import fs from "fs";
import path from "path";
const inputDir = path.join(__dirname, "../../generated/json");
console.log(inputDir);
const outputDir = path.join(__dirname, "../../generated/types");
console.log(outputDir);

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

for (const file of fs.readdirSync(inputDir)) {
  if (!file.endsWith(".json")) continue;

  const modelName = file.replace(".json", "");
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, `${modelName}.d.ts`);

  compileFromFile(inputPath, { bannerComment: "" }).then(ts => {
    fs.writeFileSync(outputPath, ts);
    console.log(`Generated: ${outputPath}`);
  });
}
