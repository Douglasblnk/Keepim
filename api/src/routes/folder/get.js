import {
  lambdaResp,
  getHeaders,
  isObjectEmpty,
  getContextPrev,
} from '@/utils/utils';

import getFolders from '@/services/folder/get-folder';

function getParameters(event, context) {
  const headers = getHeaders(event);
  const { id: userId } = getContextPrev(context);

  if (isObjectEmpty(headers) || !userId) throw new Error('Missing parameters');

  return {
    limit: headers.limit,
    userId,
  };
}

export async function handler(event, context) {
  try {
    const params = getParameters(event, context);

    const response = await getFolders(params);

    return lambdaResp(200, response);
  } catch ({ status, error }) {
    console.log('err handler post folder:>> ', error);

    return lambdaResp(error);
  }
}

export default handler;
