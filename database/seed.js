const AWS = require('aws-sdk');
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))

(async () => {
  const { id } = args;
  await getUserTable(id);
})()

function checkFilesExistence() {

} 

async function getUserTable(id) {
  try {
    
  } catch (err) {
 } 
} 
