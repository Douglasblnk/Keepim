import type { DatasourceType } from './types'

export const genericRequest = ({
  requestMethod = { method: 'GET' },
  uri,
  params,
  headers,
}: DatasourceType) => {
  return {
    requestMethod,
    uri,
    params,
    headers,
  }
}
