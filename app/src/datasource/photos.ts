import type { PhotosBody, SignedUrlsResponse } from '@type'
import authMiddleware from '@middleware/auth-middleware'
import type { AxiosRequestConfig } from 'axios'

export async function getSignedUploadUrlRequest(photos: PhotosBody) {
  return authMiddleware<SignedUrlsResponse[]>(async () => {
    const { data } = await axios.post('/get-signed-upload-url', photos, { withCredentials: true })

    return data
  })
}

export async function uploadPhotosRequest(url: string, file: File, config: AxiosRequestConfig<any>): Promise<string> {
  try {
    await axios.put(url, file, { headers: { 'Content-Type': file.type }, ...config })

    return file.name
  }

  catch (error: any) {
    const err = {
      ...error,
      fileName: file.name,
    }

    throw err
  }
}
