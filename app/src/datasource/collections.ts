import type { CollectionBody, CollectionsParams, CollectionsResponse } from '@type/collection'
import authMiddleware from '@middleware/auth-middleware'
import type { QueryFunctionContext } from '@tanstack/vue-query'
import type { WritableComputedRef } from 'vue'
import type { EvaluatedKeyPagination } from './../../../api/src/models/pagination'

export async function createCollectionRequest(body: CollectionBody) {
  return authMiddleware(async () => {
    const { data } = await axios.post('/collection', body, { withCredentials: true })

    return data
  })
}

export async function getCollectionsCountRequest() {
  return authMiddleware(async () => {
    const { data } = await axios.get('/collections-count', { withCredentials: true })

    return data
  })
}

export async function getCollectionsRequest({ queryKey, pageParam }: QueryFunctionContext<(string | WritableComputedRef<CollectionsParams>)[], any>) {
  const params = queryKey[1] as unknown as CollectionsParams
  const startKey = pageParam?.id

  return authMiddleware<EvaluatedKeyPagination<CollectionsResponse[]>>(async () => {
    const { data } = await axios.get('/collections', { withCredentials: true, params: { ...params, startKey } })

    return data
  })
}
