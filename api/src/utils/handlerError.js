import { getBody, lambdaResp } from '@/utils/utils';

export async function handler(_, context) {
  const { prev } = context;

  const body = getBody(prev);
  const { statusCode } = prev;

  return lambdaResp(
    statusCode || 400,
    body.name || body,
  );
}

export default handler;
