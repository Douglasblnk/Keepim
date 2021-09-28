import { v4 as uuidv4 } from 'uuid';
import { formatISO } from 'date-fns';
import dynamodbFactory from '@/composables/use-dynamodb-factory';
import tables from '@/utils/tables';

export default function userModel(user) {
  const { doc } = dynamodbFactory();
  const db = doc();

  const putUser = async () => {
    const params = {
      TableName: tables.USER,
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

  const queryUser = async () => {
    const params = {
      TableName: tables.USER,

    };
  };

  return {
    putUser,
    queryUser,
  };
}
