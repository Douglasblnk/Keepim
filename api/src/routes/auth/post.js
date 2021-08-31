import { lambdaResp, lambdaRespErr } from '@/utils/lambda-utils'

export async function run (lambda) {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(lambdaResp(200, 'oi'))
      }, 2000);
    })
  } catch (error) {
    console.log('err authValidate:>> ', err);

    return lambdaRespErr(error)
  }
}
