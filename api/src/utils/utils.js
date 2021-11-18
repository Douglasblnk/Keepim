export const isString = (arg) => typeof arg === 'string';

export const objToStr = (arg) => ((isString(arg)) ? arg : JSON.stringify(arg));

export const isObject = (obj) => typeof obj === 'object' && obj === Object(obj) && !Array.isArray(obj);

export const isObjectEmpty = (obj) => isObject(obj) && Object.keys(obj).length === 0;

export const getBody = (event, defaultValue = null) => {
  if (!isObject(event) || !event.body) return defaultValue;
  if (typeof event.body === 'string') return JSON.parse(event.body);
  return event.body;
};

export const getHeaders = (event, defaultValue = null) => {
  if (!isObject(event) || !event.headers) return defaultValue;

  return typeof event.headers === 'string'
    ? JSON.parse(event.headers)
    : event.headers;
};

export const getToken = (event, defaultValue = null) => {
  const headers = getHeaders(event, {});

  const { token } = headers;

  return token || defaultValue;
};

export const getContextPrev = (context, defaultValue = null) => {
  if (!isObject(context)) return defaultValue;

  const { body } = context.prev;

  return typeof body === 'string'
    ? JSON.parse(body)
    : body;
};

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
