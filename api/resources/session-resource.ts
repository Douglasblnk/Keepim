export default {
  SessionTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: 'Keepim.Session',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'refreshToken',
          AttributeType: 'S',
        },
        {
          AttributeName: 'username',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'session-refresh-token-index',
          KeySchema: [
            {
              AttributeName: 'refreshToken',
              KeyType: 'HASH',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
        {
          IndexName: 'session-username-index',
          KeySchema: [
            {
              AttributeName: 'username',
              KeyType: 'HASH',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      ],
    },
  },
}
