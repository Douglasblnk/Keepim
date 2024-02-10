import { defineStore } from 'pinia'
import type { AxiosProgressEvent, AxiosRequestConfig } from 'axios'
import type { CollectionResponse, SignedUrlsResponse } from '@type'
import { mergeDeep } from '@utils'

interface State {
  collection?: CollectionResponse
  isAddingCover?: boolean
  isRemoving?: boolean
  filesToUpload: File[]
  tab: 'photos' | 'info'
  uploading: {
    [key: string]: {
      isUploading: boolean
      isPersisting: boolean
      canResetQuery: boolean
      queue: {
        file: File
        fileName: string
        retryLoading?: boolean
      }[]
      progressPct: Record<string, number>
      abortController?: AbortController
      errors: string[]
      response: PromiseFulfilledResult<string>[]
    }
  }
}

const { userStorage } = useLocalStorage()

function makeDefaultValues(currentState: State['uploading'][string], signedUrls: SignedUrlsResponse[]): State['uploading'][string] {
  if (currentState?.errors?.length) {
    const remainingErrors = currentState.errors
      .filter(error => !signedUrls.some(signedUrl => signedUrl.fileName === error))

    return {
      isUploading: true,
      isPersisting: false,
      canResetQuery: false,
      queue: currentState.queue,
      progressPct: currentState.progressPct,
      abortController: new AbortController(),
      errors: remainingErrors,
      response: currentState?.response || [],
    }
  }

  return {
    isUploading: true,
    isPersisting: false,
    canResetQuery: false,
    queue: [],
    progressPct: {},
    abortController: new AbortController(),
    errors: [],
    response: [],
  }
}

function generateRequests(currentState: State['uploading'][string], signedUrls: SignedUrlsResponse[], files: File[]) {
  return signedUrls.map((signedUrl) => {
    const file = files.find(file => file.name === signedUrl.fileName) as File

    if (!currentState.errors.length) {
      if (!currentState.queue.some(fileQueue => fileQueue.fileName === signedUrl.fileName)) {
        currentState.queue.push({
          fileName: signedUrl.fileName,
          file,
          retryLoading: false,
        })
      }
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
    isAddingCover: false,
    isRemoving: false,
    filesToUpload: [],
    uploading: {},
    tab: 'photos',
  }),
  getters: {
    inUploading: state => state.uploading?.[state.collection?.collectionName as string],
    collectionName: state => state.collection?.collectionName as string,
  },
  actions: {
    setCollection(collection: CollectionResponse | undefined) {
      this.collection = collection
    },

    clearUploadingState() {
      this.uploading[this.collectionName] = {
        isUploading: false,
        isPersisting: false,
        canResetQuery: true,
        queue: [],
        progressPct: {},
        abortController: undefined,
        errors: [],
        response: [],
      }

      this.filesToUpload = []
    },

    cancelUpload() {
      if (this.uploading?.[this.collectionName]?.abortController)
        this.uploading[this.collectionName].abortController?.abort()

      this.clearUploadingState()
    },

    async finishUpload() {
      this.uploading[this.collectionName].isPersisting = true

      if (!this.uploading[this.collectionName].response.length)
        return this.clearUploadingState()

      try {
        await this.persistCollectionPhotos(this.uploading[this.collectionName].response)

        this.clearUploadingState()
      }

      catch (err) {
        this.uploading[this.collectionName].isPersisting = false

        this.uploading[this.collectionName].errors = this.uploading[this.collectionName].response
          .map(({ value }) => value)
      }
    },

    async persistCollectionPhotos(photos: PromiseFulfilledResult<string>[]) {
      const photosKeys = photos.map((photo) => {
        return `${userStorage.value.username}/${this.collectionName}/${photo.value}`
      })

      return await persistCollectionPhotosRequest(photosKeys, this.collection?.id)
    },

    async initiatePhotosUploadProcess(signedUrls: SignedUrlsResponse[], files: File[]) {
      this.uploading[this.collectionName] = makeDefaultValues(this.uploading[this.collectionName], signedUrls)

      const requests = generateRequests(
        mergeDeep(this.uploading[this.collectionName]) as State['uploading'][string],
        signedUrls,
        files,
      )

      const response = await Promise.allSettled(requests)

      this.uploading[this.collectionName].response.push(
        ...response.filter(result => result.status === 'fulfilled') as PromiseFulfilledResult<string>[],
      )

      if (
        response.some(result => result.status === 'rejected' && result.reason?.code !== 'ERR_CANCELED')
        || this.uploading[this.collectionName].errors?.length
      ) {
        this.uploading[this.collectionName].errors = [
          ...response
            .filter(result => result.status === 'rejected' && result.reason?.code !== 'ERR_CANCELED')
            .map(({ reason }: any) => reason.fileName),
          ...this.uploading[this.collectionName].errors,
        ]
      }

      else {
        if (response.every(result => result.status !== 'rejected'))
          this.finishUpload()
      }
    },
  },
})
