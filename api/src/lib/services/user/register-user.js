import useCryptography from '@/composables/use-cryptography';
import userModel from '@/lib/models/user';

async function register(user) {
  const { putUser } = userModel(user);

  return putUser();
}

async function getPasswordHash({ password }) {
  const { genSaltRounds, hashPassword } = useCryptography();

  const salt = await genSaltRounds();

  return hashPassword(password, salt);
}

export default async function registerUser(user) {
  const hashedPassword = await getPasswordHash(user);

  const response = await register({ ...user, password: hashedPassword });

  return response;
}
