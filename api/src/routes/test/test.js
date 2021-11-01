import { lambdaResp } from '@/utils/utils';

export async function run() {
  return lambdaResp(200, { msg: 'OK' });
}

export default run;
