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
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
        createdAt: formatISO(new Date()),
        updatedAt: formatISO(new Date()),
      },
    };

    await db.put(params).promise();

    return { status: 200, msg: 'User created' };
  };

  const queryUser = async () => {
    const params = {
      TableName: tables.USER,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': user.id,
      },
    };

    const { Items } = await db.query(params).promise();

    return Items;
  };

  return {
    putUser,
    queryUser,
  };
}
