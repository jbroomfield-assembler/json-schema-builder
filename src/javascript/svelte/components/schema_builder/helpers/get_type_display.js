const getTypeDisplay = schema => {
  if (schema.type === 'string') {
    return schema.format || 'text'
  } 
  if (schema.$schema) {
    return 'data model'
  }
  return schema.type
}

export default getTypeDisplay