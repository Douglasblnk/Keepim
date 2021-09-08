import { v4 as uuidv4 } from 'uuid';
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
        createdAt: new Date().getDate(),
        updatedAt: new Date().getDate(),
      },
    };

    const response = await db.put(params).promise();

    return response;
  };

  return {
    createUser,
  };
}
