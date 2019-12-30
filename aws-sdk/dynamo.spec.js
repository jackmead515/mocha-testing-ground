const sinon = require('sinon');
const assert = require('assert');
const Chance = require('chance');
const proxyquire = require('proxyquire');

const chance = Chance();

describe('Test Suite', () => {
  let mut;
  let clientStub;

  before(() => {
    clientStub = {
      batchWrite: sinon.stub()
    }

    const awsStub = {
      DynamoDB: {
        DocumentClient: class {
          constructor() {
            return clientStub;
          }
        }
      }
    }

    mut = proxyquire('./dynamo.js', {
      'aws-sdk': awsStub
    })
  });

  it('should write random data!', async () => {
    const expectedData = chance.string();

    clientStub.batchWrite.yields(null, expectedData);

    const data = await mut.run();

    sinon.assert.callCount(clientStub.batchWrite, 1);
    assert.strictEqual(data, expectedData);
  });
})