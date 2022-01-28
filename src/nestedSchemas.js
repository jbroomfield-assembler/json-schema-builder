export const getArrayDimension = schema => (
  schema.type === 'array' ? 1 + getArrayDimension(schema.items) : 0
)

export const getItemSchema = schema => (
  schema.type === 'array' ? getItemSchema(schema.items) : schema
)