import type { DatasourceType } from './types'

export function genericRequest({
  requestMethod = { method: 'GET' },
  uri,
  params,
  headers,
}: DatasourceType) {
  return {
    requestMethod,
    uri,
    params,
    headers,
  }
}
