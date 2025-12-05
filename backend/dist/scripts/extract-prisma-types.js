"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/extract-prisma-types.js
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prismaDts = path_1.default.join(process.cwd(), "node_modules/.prisma/client/index.d.ts");
console.log('prismaDT', prismaDts);
process.chdir('../');
const output = path_1.default.join(process.cwd(), "index.d.ts");
//process.chdir('./backend');
const full = fs_1.default.readFileSync(prismaDts, "utf8");
// extract only the model exports
const modelExports = full.match(/export type [A-Z][A-Za-z0-9]+ = [\s\S]*?;/g);
if (!modelExports) {
    throw new Error("No model exports found in Prisma index.d.ts");
}
const content = modelExports.join("\n\n");
fs_1.default.writeFileSync(output, content);
console.log("Shared Prisma types generated.");
