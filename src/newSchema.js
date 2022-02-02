const exclusiveKeywords = {
  number: {
  },
  string: {
  },
  array: {
    items: {},
  },
  object: {
    properties: {},
    additionalProperties: false,
    required: [],
    dependentRequired: {},
  },
  boolean: {
    default: false
  }
}


const newSchema = ({
  type,
  title = '',
  code = '',
  parentCode,
  format,
}) => {

  if (type === 'data-model') {
    return ({
      $schema: "http://json-schema.org/draft-07/schema",
      $id: `/schemas/${parentCode}/${code}`,
      ...newSchema({
        type: 'object',
        title,
        code,
      }),
    })
  }

  if (['date', 'time', 'date-time', 'email'].includes(type)) {
    return newSchema({
      type: 'string',
      title,
      code,
      format: type,
    })
  }

  if (type === 'new-property') {
    return {
      type,
      properties: {
        title: '',
        code: '',
        type: '',
      },
    }
  }

  if (type === 'text') type = 'string'

  return {
    type,
    title,
    code,
    format,
    new: true,
    ...JSON.parse(JSON.stringify(exclusiveKeywords[type]))
  }

}

export default newSchema