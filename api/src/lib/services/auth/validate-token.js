import useAuthentication from '@/composables/use-authentication';
import useError from '@/composables/use-error';

const { unauthorizedError } = useError();

export default async function validateToken({ token }) {
  try {
    const { verifyJwt } = useAuthentication();

    const verified = verifyJwt(token);

    console.log('verified :>> ', verified);

    return verified;
  } catch (err) {
    throw unauthorizedError(err);
  }
}
