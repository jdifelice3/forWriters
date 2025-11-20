// scripts/extract-prisma-types.js
import fs from "fs";
import path from "path";

const prismaDts = path.join(
  process.cwd(),
  "node_modules/.prisma/client/index.d.ts"
);
console.log('prismaDT', prismaDts);
process.chdir('../');
const output = path.join(
  process.cwd(),
  "index.d.ts"
);
//process.chdir('./backend');
const full = fs.readFileSync(prismaDts, "utf8");

// extract only the model exports
const modelExports = full.match(/export type [A-Z][A-Za-z0-9]+ = [\s\S]*?;/g);

if (!modelExports) {
  throw new Error("No model exports found in Prisma index.d.ts");
}

const content = modelExports.join("\n\n");
fs.writeFileSync(output, content);

console.log("Shared Prisma types generated.");
