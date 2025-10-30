import Ajv, { ValidateFunction } from 'ajv';
import fs from 'fs';
import path from 'path';

const ajv = new Ajv({ allErrors: true, strict: false });
const schemaCache: Record<string, ValidateFunction> = {};

export function validateSchema(schemaFileName: string, responseData: any): void {
  if (!schemaCache[schemaFileName]) {
    const schemaPath = path.join(__dirname, '..', 'schemas', schemaFileName);
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    schemaCache[schemaFileName] = ajv.compile(schema);
  }

  const validate = schemaCache[schemaFileName];
  const valid = validate(responseData);

  if (!valid) {
    console.error('Schema validation errors:', validate.errors);
    throw new Error('Response does not match the expected schema');
  }
}