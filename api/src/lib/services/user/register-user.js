import useCryptography from '@/composables/use-cryptography';
import userModel from '@/lib/models/user';

async function register({ ...user }) {
  const { createUser } = userModel(user);

  return createUser();
}

async function getPasswordHash(password) {
  const { genSaltRounds, hashPassword } = useCryptography();

  const salt = await genSaltRounds();
  const hashedPassword = await hashPassword(password, salt);

  return {
    hashedPassword,
  };
}

export default async function registerUser({ email, password, name }) {
  const { hashedPassword } = await getPasswordHash(password);

  const response = await register({ email, password: hashedPassword, name });
  console.log('response :>> ', response);
  return { mgs: 'ok' };
}
