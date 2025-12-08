import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import parser from "@loancrate/prisma-schema-parser";
const { parsePrismaSchema } = parser;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateDTOs() {
  const schemaPath = path.resolve(__dirname, "../../prisma/schema.prisma");
  const schema = await fs.readFile(schemaPath, "utf8");

  const ast = parsePrismaSchema(schema);

  const models = ast.declarations.filter((d) => d.kind === "model");
  const enums = ast.declarations.filter((d) => d.kind === "enum");

  const outputPath = path.resolve(__dirname, "../types/domain-types.ts");

  let output = `// AUTO-GENERATED — DO NOT EDIT\n`;
  output += `// Generated via parsePrismaSchema()\n\n`;

  //
  // ENUMS FIRST
  //
  for (const e of enums) {
    const enumName = `${e.name.value}`;
    const values = e.members
      .filter((m) => m.kind === "enumValue")
      .map((m) => `"${m.name.value}"`)
      .join(" | ");

    output += `export type ${enumName} = ${values};\n\n`;
  }

  //
  // MODELS
  //
  for (const model of models) {
    const modelName = model.name.value;

    output += `export interface ${modelName} {\n`;

    const fields = model.members.filter((m) => m.kind === "field");

    for (const field of fields) {
      const name = field.name.value;
      const optional = field.type.kind === "optional" ? "?" : "";
      const tsType = prismaToTs(field.type);

      output += `  ${name}${optional}: ${tsType};\n`;
    }

    output += `}\n\n`;
  }

  await fs.writeFile(outputPath, output, "utf8");
  console.log("DTOs generated at", outputPath);
}

//
// PRISMA → TYPESCRIPT
//
function prismaToTs(typeNode) {
  let t = typeNode;
  let isList = false;

  if (t.kind === "optional") {
    t = t.type;
  }
  if (t.kind === "list") {
    isList = true;
    t = t.type;
  }

  const baseType = resolveBaseTsType(t);

  return isList ? `${baseType}[]` : baseType;
}

function resolveBaseTsType(typeNode) {
  const typeName = typeNode.name.value;

  const scalarMap = {
    String: "string",
    Int: "number",
    BigInt: "number",
    Float: "number",
    Decimal: "number",
    Boolean: "boolean",
    DateTime: "string",
    Json: "any",
    Bytes: "Uint8Array",
  };

  // Scalar
  if (scalarMap[typeName]) return scalarMap[typeName];

  // Enum → Enums were generated as `${EnumName}DTO`
  // You can detect enums by adding an enum lookup if needed.
  // But the simplest correct rule:
  return `${typeName}`;
}

generateDTOs().catch((err) => {
  console.error("DTO generation failed:", err);
  process.exit(1);
});
