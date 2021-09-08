import { genSalt, hash } from 'bcrypt';

export default function useCryptography() {
  const genSaltRounds = async () => genSalt(Number(process.env.saltRound));

  const hashPassword = async (password, salt) => hash(password, salt);

  return {
    genSaltRounds,
    hashPassword,
  };
}
