import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("DIRNAME:", __dirname);

const guess1 = path.resolve(__dirname, "../../node_modules/.prisma/client");
const guess2 = path.resolve(__dirname, "../../../node_modules/.prisma/client");
const guess3 = path.resolve(__dirname, "../../../../node_modules/.prisma/client");

console.log("Guess1:", guess1);
console.log("Guess2:", guess2);
console.log("Guess3:", guess3);
