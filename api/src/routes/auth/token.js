import {
  getBody,
  isObjectEmpty,
  lambdaResp,
} from '@/utils/utils';

import validateToken from '@/services/auth/validate-token';

function getParameters(event) {
  const body = getBody(event);

  if (isObjectEmpty(body)) throw new Error('Missing parameters');

  return body;
}

export async function handler(event) {
  try {
    const params = getParameters(event);

    const response = await validateToken(params);

    return lambdaResp(200, response);
  } catch ({ status, error }) {
    console.log('error validateToken :>> ', status, error);

    return lambdaResp(status, error.name || error);
  }
}

export default handler;
