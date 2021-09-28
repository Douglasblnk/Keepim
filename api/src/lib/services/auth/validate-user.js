import userModel from '@/lib/models/user';

async function getUser(user, password) {
  const { queryUser } = userModel({ user, password });

  return queryUser();
}

export default async function validateUser({ user, password }) {
  const userFound = await getUser(user, password);

  console.log('userFound :>> ', userFound);
}
