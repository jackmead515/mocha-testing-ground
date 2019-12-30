const AWS = require('aws-sdk');

const TABLE_NAME = 'my-table';

function getClient() {
  return new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    region: 'us-east-1'
  });
}

function generateRequests() {
  const requests = [];
  for (let i = 0; i < 25; i++) {
    requests.push({
      PutReqest: {
        Item: {
          myKey: i.toString(),
          number: Math.random()*1000
        }
      }
    });
  }
  return requests;
}

async function run() {
  const client = getClient();
  const params = {
    RequestItems: {
      [TABLE_NAME]: generateRequests()
    }
  }
  return client.batchWrite(params, (err, data) => {
    if (err) {
      throw err;
    }

    return data;
  });
}

module.exports = {
  run
}