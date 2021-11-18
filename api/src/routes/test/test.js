import { lambdaResp } from '@/utils/utils';

export async function handler() {
  return lambdaResp(200, { msg: 'OK' });
}

export default handler;
