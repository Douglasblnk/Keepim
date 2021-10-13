import { sign, verify } from 'jsonwebtoken';
import useError from '@/composables/use-error';

const { unauthorizedError } = useError();

export default function useAuthentication() {
  const getBearer = (token) => {
    if (!token.includes('Bearer')) throw unauthorizedError('Invalid Token');

    return token.split(' ')[1];
  };

  const signJwt = (user) => sign(user, process.env.JWT_KEY, { expiresIn: '10h' });

  const verifyJwt = (token) => verify(getBearer(token), process.env.JWT_KEY);

  return {
    signJwt,
    verifyJwt,
  };
}
