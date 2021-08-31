export const isString = arg => typeof arg === 'string';

export const objToStr = arg => ((isString(arg)) ? arg : JSON.stringify(arg));

export const lambdaResp = (statusCode, body, headers = {}) => ({ statusCode, ...(body ? { body: objToStr(body) } : ''), headers });

export const lambdaRespErr = ({
  status, statusCode, stack, error, message,
} = {}) => {
  const body = { error: { message: 'Internal Server Error' } };

  if (error) body.error = error;
  if (!error && message) body.error.message = message;
  if (error && message) body.message = message;

  if (stack && (process.env.DEBUG || process.env.IS_OFFLINE)) body.error.stack = stack;

  return lambdaResp(status || statusCode || 500, body);
};
