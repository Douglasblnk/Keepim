import {
  lambdaResp,
  lambdaRespErr,
  getBody,
  isObjectEmpty,
} from '@/utils/utils';

import registerUser from '@/lib/services/user/register-user';

function getParameters(event) {
  const body = getBody(event);

  if (isObjectEmpty(body)) throw new Error('Missing parameters');

  return body;
}

export async function handler(event) {
  try {
    const params = getParameters(event);

    const response = await registerUser(params);

    return lambdaResp(200, response);
  } catch (error) {
    console.log('err handler post user:>> ', error);

    return lambdaRespErr(error);
  }
}

export default handler;
