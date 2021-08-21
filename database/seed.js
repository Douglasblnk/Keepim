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

async function checkFilesExistence(table) {
  try {
    const exist = await fs.readFile(`${PATH}/${table}.json`)

    return !!exist && Array.isArray(JSON.parse(exist))
  } catch (err) {
    return false
  }
} 

async function getUserTable(id) {
  try {
    const exist = await checkFilesExistence(TABLE_USER)
    
    if (!exist) {
      const { Items } = await db.query({
        TableName: TABLE_USER,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': id
        }
      }).promise();

      await saveFile(TABLE_USER, Items)
    }
  } catch (err) {
    console.log('err getUserTable :>> ', err);
  }
}

(async () => {
  const { id } = args;
  
  await getUserTable(id);
})()
