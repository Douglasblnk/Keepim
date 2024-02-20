/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript'

import Health from '@functions/health'
import User from '@functions/user'
import Auth from '@functions/auth'
import Collection from '@functions/collection'
import Photos from '@functions/photos'

import {
  CollectionBucketResource,
  CollectionResource,
  CollectionThumbnailBucketResource,
  ConfigResource,
  FixedCollectionResource,
  SessionResource,
  UserResource,
} from './resources'

const serverlessConfiguration: AWS = {
  service: 'keepim-api',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function',
    'serverless-s3-local',
    'serverless-dynamodb',
    'serverless-prune-plugin',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'sa-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      COLLECTION_BUCKET_NAME: '${env:COLLECTION_BUCKET_NAME}',
      COLLECTION_THUMBNAIL_BUCKET_NAME: '${env:COLLECTION_THUMBNAIL_BUCKET_NAME}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      REFRESH_TOKEN_LENGTH: '${env:REFRESH_TOKEN_LENGTH}',
      SESSION_DB_TABLE: '${env:SESSION_DB_TABLE}',
      COLLECTION_DB_TABLE: '${env:COLLECTION_DB_TABLE}',
      USER_DB_TABLE: '${env:USER_DB_TABLE}',
      CONFIG_DB_TABLE: '${env:CONFIG_DB_TABLE}',
      FIXED_COLLECTION_DB_TABLE: '${env:FIXED_COLLECTION_DB_TABLE}',
      JWT_EXPIRATION_TIME: '${env:JWT_EXPIRATION_TIME}',
      REFRESH_TOKEN_EXPIRATION: '${env:REFRESH_TOKEN_EXPIRATION}',
      JWT_SECRET: '${env:JWT_SECRET}',
    },
  },
  functions: {
    Health,
    ...User,
    ...Auth,
    ...Collection,
    ...Photos,
  },
  package: {
    individually: true,
  },
  useDotenv: true,
  custom: {
    s3: {
      host: 'localhost',
      directory: '/tmp',
      cors: './cors.xml',
      allowMismatchedSignatures: true,
      buckets: [
        'douglasblnk-keepim-prod-storage',
        'douglasblnk-keepim-prod-thumbnail-storage',
      ],
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      external: ['sharp'],
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      packagerOptions: {
        scripts: ['npm install --os=linux --cpu=x64 sharp'],
      },
    },
    prune: {
      automatic: true,
      number: 3,
    },
    serverlessOffline: {
      httpPort: 4000,
      websocketPort: 4001,
      lambdaPort: 4002,
    },
    dynamodb: {
      stages: 'dev',
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
        seed: true,
      },
      seed: {
        domain: {
          sources: [
            {
              table: 'Keepim.User',
              sources: ['./migration/user-seed.json'],
            },
            {
              table: 'Keepim.Collection',
              sources: ['./migration/collection-seed.json'],
            },
            {
              table: 'Keepim.Config',
              sources: ['./migration/config-seed.json'],
            },
          ],
        },
      },
    },
  },
  resources: {
    Resources: {
      ...UserResource,
      ...ConfigResource,
      ...SessionResource,
      ...CollectionResource,
      ...FixedCollectionResource,
      ...CollectionBucketResource,
      ...CollectionThumbnailBucketResource,
    },
  },
}

// eslint-disable-next-line antfu/no-cjs-exports
module.exports = serverlessConfiguration
