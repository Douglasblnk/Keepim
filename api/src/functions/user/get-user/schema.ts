export interface HelloSchema {
  type: 'object'
  properties: {
    id: { type: 'string' }
  }
  required: ['name']
}
