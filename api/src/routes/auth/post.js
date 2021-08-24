export async function run (lambda) {
  try {
    setTimeout(() => {
      return lambdaResp(200, 'oi')
    }, 2000);
  } catch (error) {
    console.log('err authValidate:>> ', err);

    return lambdaRespErr(error)
  }
}
