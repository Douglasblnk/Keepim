import { defineStore } from 'pinia'
import type { AxiosProgressEvent, AxiosRequestConfig } from 'axios'
import type { CollectionResponse, SignedUrlsResponse } from '@type'

interface State {
  collection?: CollectionResponse
  uploading: {
    [key: string]: {
      isUploading: boolean
      queue: {
        file: File
        fileName: string
        retryLoading?: boolean
      }[]
      progressPct: Record<string, number>
      abortController?: AbortController
      errors: string[]
    }
  }
}

const { userStorage } = useLocalStorage()

function makeDefaultValues(currentState: State['uploading'][string], signedUrls: SignedUrlsResponse[]) {
  if (currentState?.errors?.length) {
    const remainingErrors = currentState.errors
      .filter(error => !signedUrls.some(signedUrl => signedUrl.fileName === error))

    return {
      isUploading: true,
      queue: currentState.queue,
      progressPct: currentState.progressPct,
      abortController: new AbortController(),
      errors: remainingErrors,
    }
  }

  return {
    isUploading: true,
    queue: [],
    progressPct: {},
    abortController: new AbortController(),
    errors: [],
  }
}

function generateRequests(currentState: State['uploading'][string], signedUrls: SignedUrlsResponse[], files: File[]) {
  return signedUrls.map((signedUrl) => {
    const file = files.find(file => file.name === signedUrl.fileName) as File

    if (!currentState.errors.length) {
      currentState.queue.push({
        fileName: signedUrl.fileName,
        file,
        retryLoading: false,
      })
    }

    const config: AxiosRequestConfig = {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 0))

        currentState.progressPct[signedUrl.fileName] = progress
      },
      signal: currentState.abortController?.signal,
    }

    return uploadPhotosRequest(signedUrl.url, file, config)
  })
}

export const useCollectionStore = defineStore('collection-store', {
  state: (): State => ({
    collection: undefined,
    uploading: {},
  }),
  getters: {
    inUploading: state => state.uploading?.[state.collection?.collectionName as string],
  },
  actions: {
    setCollection(collection: CollectionResponse | undefined) {
      this.collection = collection
    },
    cancelUpload() {
      const collectionName = this.collection?.collectionName as string

      if (this.uploading?.[collectionName]?.abortController)
        this.uploading[collectionName].abortController?.abort()
    },
    async initiatePhotosUploadProcess(signedUrls: SignedUrlsResponse[], files: File[]) {
      const collectionName = this.collection?.collectionName as string

      this.uploading[collectionName] = makeDefaultValues(this.uploading[collectionName], signedUrls)

      const requests = generateRequests(this.uploading[collectionName], signedUrls, files)

      const response = await Promise.allSettled(requests)

      if (
        response.some(result => result.status === 'rejected' && result.reason?.code !== 'ERR_CANCELED')
        || this.uploading[collectionName].errors?.length
      ) {
        this.uploading[collectionName].errors = [
          ...response
            .filter((result): result is PromiseRejectedResult => result.status === 'rejected' && result.reason?.code !== 'ERR_CANCELED')
            .map(({ reason }) => reason.fileName),
          ...this.uploading[collectionName].errors,
        ]
      }

      else {
        this.uploading[collectionName] = {
          isUploading: false,
          queue: [],
          progressPct: {},
          abortController: undefined,
          errors: [],
        }

        if (response.every(result => result.status !== 'rejected'))
          this.persistCollectionPhotos(response as unknown as PromiseFulfilledResult<string>[])
      }
    },
    async persistCollectionPhotos(photos: PromiseFulfilledResult<string>[]) {
      const collectionName = this.collection?.collectionName as string

      const photosKeys = photos.map((photo) => {
        return `${userStorage.value.username}/${collectionName}/${photo.value}`
      })

      const response = await persistCollectionPhotosRequest(photosKeys)

      console.log('response :>> ', response)
    },
  },
})
