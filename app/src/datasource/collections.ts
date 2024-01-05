import type { CollectionBody, CollectionResponse, CollectionsParams, CollectionsResponse } from '@type/collection'
import type { EvaluatedKeyPagination } from '@type/pagination'

import authMiddleware from '@middleware/auth-middleware'

export async function createCollectionRequest(body: CollectionBody) {
  return authMiddleware<CollectionBody & { id: string }>(async () => {
    const { data } = await axios.post('/collection', body, { withCredentials: true })

    return data
  })
}

export async function persistCollectionPhotosRequest(photos: string[], collectionId?: string) {
  return authMiddleware(async () => {
    const { data } = await axios.put('/collection-photos', { photos, collectionId }, { withCredentials: true })

    return data
  })
}

export async function updateCollectionCoverRequest({ coverKey, collectionId }: { coverKey: string; collectionId?: string }) {
  return authMiddleware(async () => {
    const { data } = await axios.patch('/collection-cover', { coverKey, collectionId }, { withCredentials: true })

    return data
  })
}

export async function deleteCollectionPhotoRequest({ photoKeys, collectionId }: { photoKeys: string[]; collectionId?: string }) {
  return authMiddleware(async () => {
    const { data } = await axios.delete(`/collection-photo/${collectionId}`, { params: photoKeys, withCredentials: true })

    return data
  })
}

export async function getCollectionsCountRequest() {
  return authMiddleware(async () => {
    const { data } = await axios.get('/collections-count', { withCredentials: true })

    return data
  })
}

export async function getCollectionsRequest(params: CollectionsParams, pageParam: any) {
  const startKey = pageParam?.id

  return authMiddleware<EvaluatedKeyPagination<CollectionsResponse>>(async () => {
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
