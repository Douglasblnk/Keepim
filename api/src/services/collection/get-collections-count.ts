import { queryCollectionsCount } from '@repository/collection'

export default async (username: string) => {
  return queryCollectionsCount(username)
}
