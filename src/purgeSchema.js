const purgeSchema = schema => {
  const purgedSchema = JSON.parse(JSON.stringify(schema))
  Object.entries(purgedSchema).forEach(([key, value]) => {
    if (value == null) { // null == undefined
      delete purgedSchema[key]
    } else if (typeof value === 'object') {
      purgedSchema[key] = purgeSchema(value)
    }
  })
  return purgedSchema
}

export default purgeSchema