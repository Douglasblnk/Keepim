import type { AWS } from '@serverless/typescript'
import Health from '@functions/health'
import User from '@functions/user'
import Resources from './db-resources'

const serverlessConfiguration: AWS = {
  service: 'keepim-api',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-dynamodb-local',
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
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: 'Allow',
          Action: [
            'dynamodb:DescribeTable',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem',
          ],
          Resource: 'arn:aws:dynamodb:sa-east-1:*:table/TodosTable',
        }],
      },
    },
  },
  functions: {
    Health,
    ...User,
  },
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
    Resources,
  },
}

module.exports = serverlessConfiguration
