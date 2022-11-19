export const SIGN_IN = {
  ...genericRequest({
    requestMethod: restMethods.post,
    uri: 'sign-in',
  }),
}
