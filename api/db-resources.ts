export default {
  UserTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: 'Keepim.User',
      AttributeDefinitions: [{
        AttributeName: 'id',
        AttributeType: 'S',
      }],
      KeySchema: [{
        AttributeName: 'id',
        KeyType: 'HASH',
      }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  },
}
