import { getToken, lambdaResp } from '@/utils/utils';
import validateToken from '@/services/auth/validate-token';

export async function handler(event) {
  try {
    const token = getToken(event);

    if (!token) throw new Error('Missing parameters');

    const response = await validateToken({ token });

    return lambdaResp(200, response);
  } catch ({ status, error }) {
    console.log('error authorization :>> ', status, error);

    throw lambdaResp(status, error);
  }
}

export default handler;
