import { removeAccess } from '@/routes';

export function handleAuthorizationError(error) {
  const { status, data } = error;

  if (status === 401 && data === 'JsonWebTokenError')
    removeAccess();

  return error;
}
