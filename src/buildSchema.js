const exclusiveKeywords = {
  number: {
    multipleOf: null,
    maximum: null,
    exclusiveMaximum: null,
    minimum: null,
    exclusiveMinimum: null,
  },
  string: {
    maxLength: null,
    minLength: null,
    pattern: null,
  },
  array: {
    items: {},
    maxItems: null,
    minItems: null,
    uniqueItems: false,
    contains: null,
    maxContains: null,
    minContains: null,
  },
  object: {
    properties: {},
    additionalProperties: false,
    maxProperties: null,
    minProperties: null,
    required: [],
    dependentRequired: {},
  },
  boolean: {
    default: false
  }
}


const buildSchema = ({
  type,
  title = '',
  description = '',
  id = '',
  code = '',
  def = null,
  root = false,
  parentId,
}) => {

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

  const schema = {
    '$id': id,
    type,
    title,
    code,
    description,
    'default': def,
    examples: [],
    ...JSON.parse(JSON.stringify(exclusiveKeywords[type]))
  }

  if (root) {
    schema['$schema'] = 'http://json-schema.org/draft-07/schema'
  } else {
    schema.new = true
  }
  return schema

}

export default buildSchema