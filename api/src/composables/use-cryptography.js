import { genSalt, hash, compare } from 'bcrypt';

export default function useCryptography() {
  const genSaltRounds = async () => genSalt(Number(process.env.SALT_ROUND));

  const hashPassword = async (password, salt) => hash(password, salt);

  const comparePassword = async (hashedPassword, password) => compare(password, hashedPassword);

  return {
    genSaltRounds,
    hashPassword,
    comparePassword,
  };
}
