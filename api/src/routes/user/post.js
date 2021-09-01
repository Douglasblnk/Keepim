import { lambdaResp, lambdaRespErr } from '@/utils/lambda-utils'

function getParameters (event) {
  console.log('event :>> ', event);
  // return {
  //   userId: event.pathParameters.userId,
  //   postId: event.pathParameters.postId
  // }
}

export async function run (event) {
  try {
    const parameters = getParameters(event)
    console.log('parameters :>> ', parameters);

    return lambdaResp(200, {result: 'success'})
  } catch (error) {
    console.log('err authValidate:>> ', error);

    return lambdaRespErr(error)
  }
}
