import userModel from '@/models/user';
import useCryptography from '@/composables/use-cryptography';
import useAuthentication from '@/composables/use-authentication';
import useError from '@/composables/use-error';

const { notFoundError, unauthorizedError } = useError();

async function getUser(id, password) {
  const { queryUser } = userModel({ id, password });

  return queryUser();
}

async function validatePassword({ password: hash }, password) {
  const { comparePassword } = useCryptography();

  const match = await comparePassword(hash, password);

  if (!match) throw unauthorizedError('Incorrect password');
}

function generateToken(user) {
  const { signJwt } = useAuthentication();

  const {
    password,
    createdAt,
    updatedAt,
    ...parsedUser
  } = user;

  return signJwt(parsedUser);
}

export default async function validateUser({ id, password }) {
  const [userFound] = await getUser(id, password);

  if (!userFound) throw notFoundError('User not Found');

  await validatePassword(userFound, password);

  return generateToken(userFound);
}
