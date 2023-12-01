import type { CollectionBody, CollectionResponse, CollectionsParams, CollectionsResponse } from '@type/collection'
import type { EvaluatedKeyPagination } from '@type/pagination'
import type { QueryFunctionContext } from '@tanstack/vue-query'
import type { WritableComputedRef } from 'vue'

import authMiddleware from '@middleware/auth-middleware'

export async function createCollectionRequest(body: CollectionBody) {
  return authMiddleware<CollectionBody & { id: string }>(async () => {
    const { data } = await axios.post('/collection', body, { withCredentials: true })

    return data
  })
}

export async function persistCollectionPhotosRequest(body: string[]) {
  return authMiddleware(async () => {
    const { data } = await axios.put('/collection-photos', body, { withCredentials: true })

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

export async function getCollectionRequest(id: string) {
  return authMiddleware<CollectionResponse>(async () => {
    const { data } = await axios.get(`/collection/${id}`, { withCredentials: true })

    return data
  })
}
