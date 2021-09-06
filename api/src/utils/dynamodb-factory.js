import AWS from 'aws-sdk';

export default function dynamodbFactory() {
  function getOptions({ options, offlinePort } = {}) {
    if (options) return options;

    if (process.env.IS_OFFLINE) { return { region: 'localhost', endpoint: `http://localhost:${offlinePort || 8000}` }; }
    return { region: 'sa-east-1' };
  }

  function doc({ options, offlinePort } = {}) {
    return new AWS.DynamoDB.DocumentClient(getOptions({ options, offlinePort }));
  }

  return {
    doc,
    getOptions,
  };
}
