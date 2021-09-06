import { lambdaResp, lambdaRespErr, getBody } from '@/utils/lambda-utils';

function getParameters(event) {
  return {
    ...getBody(event),
  };
}

export async function run(event) {
  try {
    const parameters = getParameters(event);

    console.log('parameters :>> ', parameters);

    return lambdaResp(200, { result: 'success' });
  } catch (error) {
    console.log('err authValidate:>> ', error);

    return lambdaRespErr(error);
  }
}

export default run;
