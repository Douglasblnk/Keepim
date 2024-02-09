export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BCRYPT_SALT: string
      REFRESH_TOKEN_LENGTH: string
      JWT_EXPIRATION_TIME: string
      REFRESH_TOKEN_EXPIRATION: string
      JWT_SECRET: string
      COLLECTION_DB_TABLE: string
      SESSION_DB_TABLE: string
      USER_DB_TABLE: string
      COLLECTION_BUCKET_NAME: string
      COLLECTION_THUMBNAIL_BUCKET_NAME: string
    }
  }
}
