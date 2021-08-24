const AWS = require('aws-sdk');
const fs = require('fs/promises');
const minimist = require('minimist')

const args = minimist(process.argv.slice(2))
const db = new AWS.DynamoDB.DocumentClient({ region: 'sa-east-1' });

const PATH = './data'
const TABLE_USER = 'Auth.User'

async function saveFile(table, data) {
  try {
    await fs.writeFile(`${PATH}/${table}.json`, JSON.stringify(data))
  } catch (err) {
    console.log('err saveFile :>> ', err);
  }
}

async function resetFile (table) {
  await fs.writeFile(`${PATH}/${table}.json`, JSON.stringify([]))
} 

async function getUserTable(id) {
  try {
    await resetFile(TABLE_USER)
    
    const { Items } = await db.query({
      TableName: TABLE_USER,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    }).promise();

    const mappedItems = Items.map(item => ({
      id: 'local',
      name: item.name,
      password: '123'
    }))

    await saveFile(TABLE_USER, mappedItems)
  } catch (err) {
    console.log('err getUserTable :>> ', err);
  }
}

(async () => {
  const { id } = args;
  
  await getUserTable(id);
})()
