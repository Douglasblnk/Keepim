import {
  getBody, isObjectEmpty, lambdaResp,
} from '@/utils/utils';

import validateToken from '@/lib/services/auth/validate-token';

function getParameters(event) {
  const body = getBody(event);
  console.log('body :>> ', event);
  if (isObjectEmpty(body)) throw new Error('Missing parameters');

  return body;
}

export async function run(event) {
  try {
    const params = getParameters(event);

    const response = await validateToken(params);

    return lambdaResp(200, response);
  } catch ({ status, error }) {
    console.log('error validateToken :>> ', error);

    return lambdaResp(status, error);
  }
}

export default run;
