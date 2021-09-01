export const isString = arg => typeof arg === 'string';

export const objToStr = arg => ((isString(arg)) ? arg : JSON.stringify(arg));

const { isObject } = require('deep-object-js');

const _validateParams = (event) => {
  if (!isObject(event)) throw new Error('Event is not an object');
}

/**
 * Faz o parse do Body de uma requisição se existir no event, caso seja necessário.
 * 
 * @requires {object} event Lambda event
 * 
 * @example
 * const myLambda = (event, context, callback) => {
 *  / event = undefined;
 *  / let body = getBody(event, {}); // -> {}  
 *  / body = getBody(event); // -> null
 * }
 * 
 */

const getBody = (event, defaultValue = null) => {
  try {
    _validateParams(event);
    if (typeof event.body === 'string') return JSON.parse(event.body);
    
    if (!isObject(event.body)) return defaultValue;

    return event.body;
  } catch (err) {
    return defaultValue;
  }
}


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
