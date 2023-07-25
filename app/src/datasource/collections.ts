import authMiddleware from '@middleware/auth-middleware'

interface CollectionBody {
  collectionName: string
  collectionDate: string
}

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
