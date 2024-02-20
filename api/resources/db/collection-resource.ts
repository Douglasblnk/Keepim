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
        {
          AttributeName: 'searchName',
          AttributeType: 'S',
        },
        {
          AttributeName: 'favoriteCollectionDate',
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
        {
          IndexName: 'collection-name-index',
          KeySchema: [
            {
              AttributeName: 'username',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'searchName',
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
        {
          IndexName: 'collection-favorite-index',
          KeySchema: [
            {
              AttributeName: 'username',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'favoriteCollectionDate',
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
