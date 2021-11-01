import {
  lambdaResp,
  lambdaRespErr,
  getBody,
  getHeaders,
  isObjectEmpty,
} from '@/utils/utils';

// import registerUser from '@/lib/services/user/register-user';

function getParameters(event) {
  const body = getBody(event);
  const headers = getHeaders(event);

  if (isObjectEmpty(body) || isObjectEmpty(headers)) throw new Error('Missing parameters');

  return { body, headers };
}

export async function run(event) {
  try {
    const params = getParameters(event);
    console.log('params :>> ', params);
    // const response = await registerUser(params);

    return lambdaResp(200, { msg: 'ok' });
  } catch (error) {
    console.log('err run post folder:>> ', error);

    return lambdaRespErr(error);
  }
}

export default run;
