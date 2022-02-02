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

  return {
    type,
    title,
    code,
    new: true,
    ...JSON.parse(JSON.stringify(exclusiveKeywords[type]))
  }

}

export default newSchema