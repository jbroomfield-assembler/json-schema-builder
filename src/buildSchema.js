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