import AWS from 'aws-sdk';

export default function dynamodbFactory({ options, offlinePort } = {}) {
  const getOptions = () => {
    if (options) return options;

    if (process.env.IS_OFFLINE) { return { region: 'localhost', endpoint: `http://localhost:${offlinePort || 8000}` }; }
    return { region: 'sa-east-1' };
  };

  const doc = () => new AWS.DynamoDB.DocumentClient(getOptions({ options, offlinePort }));

  return {
    doc,
    getOptions,
  };
}
