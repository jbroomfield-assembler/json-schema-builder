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
    maxItems: null,
    minItems: null,
    uniqueItems: false,
    maxContains: null,
    minContains: null,
  },
  object: {
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
}) => {

  if (type === 'object') {
    const schema = {
      '$id': `#/${id}.json`,
      'type': 'object',
      'title': title,
      'examples': [],
      'properties': {},
      "additionalProperties": false,
      ...exclusiveKeywords[type],
    }
    if (root) schema['$schema'] = 'http://json-schema.org/draft-07/schema'
    return schema
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
    '$id': `#/properties/${code}`,
    type,
    title,
    code,
    description,
    'default': def,
    examples: [],
    required: false,
    new: true,
    ...exclusiveKeywords[type]
  }

}

export default buildSchema