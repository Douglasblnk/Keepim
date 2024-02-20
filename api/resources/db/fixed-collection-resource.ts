export default {
  FixedCollectionTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: 'Keepim.FixedCollection',
      AttributeDefinitions: [
        {
          AttributeName: 'username',
          AttributeType: 'S',
        },
        {
          AttributeName: 'order',
          AttributeType: 'N',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'username',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'order',
          KeyType: 'RANGE',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  },
}
