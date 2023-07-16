/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript'
import Health from '@functions/health'
import User from '@functions/user'
import Auth from '@functions/auth'
import { CollectionResources, SessionResources, UserResources } from './resources'

const serverlessConfiguration: AWS = {
  service: 'keepim-api',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function',
    'serverless-dynamodb',
    'serverless-offline',
    'serverless-middleware',
    'serverless-prune-plugin',
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
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      REFRESH_TOKEN_LENGTH: '${env:REFRESH_TOKEN_LENGTH}',
      SESSION_DB_TABLE: '${env:SESSION_DB_TABLE}',
      USER_DB_TABLE: '${env:USER_DB_TABLE}',
      JWT_EXPIRATION_TIME: '${env:JWT_EXPIRATION_TIME}',
      REFRESH_TOKEN_EXPIRATION: '${env:REFRESH_TOKEN_EXPIRATION}',
      JWT_SECRET: '${env:JWT_SECRET}',
    },
  },
  functions: {
    Health,
    ...User,
    ...Auth,
  },
  package: {
    individually: true,
  },
  useDotenv: true,
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
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
          ],
        },
      },
    },
  },
  resources: {
    Resources: {
      ...SessionResources,
      ...UserResources,
      ...CollectionResources,
    },
  },
}

module.exports = serverlessConfiguration
