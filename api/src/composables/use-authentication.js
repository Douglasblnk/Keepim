import { sign, verify } from 'jsonwebtoken';

export default function useAuthentication() {
  const signJwt = (user) => sign(user, process.env.JWT_KEY, { expiresIn: '10h' });

  return {
    signJwt,
  };
}
