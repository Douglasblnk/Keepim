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

export async function downloadPhoto({ photo, photoName }: { photo: string; photoName: string }) {
  try {
    const response = await axios.get(photo, {
      responseType: 'blob',
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const downloadLink = document.createElement('a')

    downloadLink.href = URL.createObjectURL(response?.data)
    downloadLink.download = photoName

    document.body.appendChild(downloadLink)

    downloadLink.click()

    document.body.removeChild(downloadLink)

    URL.revokeObjectURL(downloadLink.href)
  }
  catch (error: any) {
    console.error('Error downloading image:', error)

    throw photoName
  }
}
