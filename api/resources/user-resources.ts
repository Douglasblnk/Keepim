export default {
  UserTable2: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: 'Keepim.User2',
      AttributeDefinitions: [
        {
          AttributeName: 'username',
          AttributeType: 'S',
        },
        {
          AttributeName: 'email',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'username',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'email-index',
          KeySchema: [
            {
              AttributeName: 'email',
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
