import {
  lambdaResp,
  lambdaRespErr,
  getHeaders,
  isObjectEmpty,
  getContextPrev,
} from '@/utils/utils';

// import createUpdateFolder from '@/services/folder/get-folder';

function getParameters(event, context) {
  // Pegar os items desejados dentro de header
  const headers = getHeaders(event);
  const { id: userId } = getContextPrev(context);

  if (isObjectEmpty(headers) || !userId) throw new Error('Missing parameters');

  return { ...headers, userId };
}

export async function handler(event, context) {
  try {
    const params = getParameters(event, context);
    console.log('params :>> ', params);
    // const response = await createUpdateFolder(params);

    // return lambdaResp(200, response);
  } catch ({ status, error }) {
    console.log('err handler post folder:>> ', error);

    return lambdaResp(error);
  }
}

export default handler;
