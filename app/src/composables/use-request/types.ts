export interface DatasourceType {
  requestMethod?: { method: string }
  uri: string | (({ ..._params }: {}) => string)
  params?: (({ ..._params }: {}) => {})
  headers?: (({ ..._params }: {}) => {})
}
