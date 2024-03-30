export default {
  CollectionTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: 'Keepim.Collection',
      AttributeDefinitions: [
        {
          AttributeName: 'username',
          AttributeType: 'S',
        },
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'collectionDate',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'username',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'id',
          KeyType: 'RANGE',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'collection-date-index',
          KeySchema: [
            {
              AttributeName: 'username',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'collectionDate',
              KeyType: 'RANGE',
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
