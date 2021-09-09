import {
  getBody, isObjectEmpty, lambdaResp, lambdaRespErr,
} from '@/utils/utils';

import validateUser from '@/lib/services/auth/validate-user';

function getParameters(event) {
  const body = getBody(event);

  if (isObjectEmpty(body)) throw new Error('Missing parameters');

  return body;
}

export async function run(event) {
  try {
    const params = getParameters(event);

    const response = await validateUser(params);

    return lambdaResp(200, response);
  } catch (error) {
    console.log('err post auth :>> ', error);

    return lambdaRespErr(error);
  }
}

export default run;
