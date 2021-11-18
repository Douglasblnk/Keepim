import {
  lambdaResp,
  getBody,
  isObjectEmpty,
  getContextPrev,
} from '@/utils/utils';

import createUpdateFolder from '@/services/folder/create-update-folder';

function getParameters(event, context) {
  const body = getBody(event);
  const { id: userId } = getContextPrev(context);

  if (isObjectEmpty(body) || !userId) throw new Error('Missing parameters');

  return { ...body, userId };
}

export async function handler(event, context) {
  try {
    const params = getParameters(event, context);

    const response = await createUpdateFolder(params);

    return lambdaResp(200, response);
  } catch ({ status, error }) {
    console.log('err handler post folder:>> ', error);

    return lambdaResp(status, error);
  }
}

export default handler;
