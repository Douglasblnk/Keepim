import { v4 as uuidv4 } from 'uuid';
import { formatISO } from 'date-fns';
import dynamodbFactory from '@/composables/use-dynamodb-factory';

export default function userModel(user) {
  const { doc } = dynamodbFactory();
  const db = doc();

  const createUser = async () => {
    const params = {
      TableName: 'Auth.User',
      Item: {
        id: uuidv4(),
        email: user.email,
        name: user.name,
        password: user.password,
        createdAt: formatISO(new Date()),
        updatedAt: formatISO(new Date()),
      },
    };

    await db.put(params).promise();

    return { status: 201, msg: 'User created' };
  };

  return {
    createUser,
  };
}
