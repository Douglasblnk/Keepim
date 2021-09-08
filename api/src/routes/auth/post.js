import { lambdaResp, lambdaRespErr } from '@/utils/utils';

export async function run(lambda) {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(lambdaResp(200, 'oi'));
      }, 2000);
    });
  } catch (error) {
    console.log('err authValidate:>> ', error);

    return lambdaRespErr(error);
  }
}

export default run;
