import dynamodbFactory from '@/composables/use-dynamodb-factory';
import tables from '@/utils/tables';

export default function folderModel(folder) {
  const { doc } = dynamodbFactory();
  const db = doc();

  const getKeyConditionExpression = () => (
    folder.folderId
      ? 'userId = :userId AND folderId = :folderId'
      : 'userId = :userId'
  );

  const getExpressionAttributesValues = () => (
    folder.folderId
      ? { ':userId': folder.userId, ':folderId': folder.folderId }
      : { ':userId': folder.userId }
  );

  const putFolder = async () => {
    const params = {
      TableName: tables.FOLDER,
      Item: {
        userId: folder.userId,
        folderId: folder.folderId,
        date: folder.date,
        name: folder.name,
        createdAt: folder.createdAt,
        updatedAt: folder.updatedAt,
      },
    };

    await db.put(params).promise();

    return { status: 200, msg: 'Folder created' };
  };

  const queryFolder = async () => {
    const params = {
      TableName: tables.FOLDER,
      KeyConditionExpression: getKeyConditionExpression(),
      ExpressionAttributeValues: getExpressionAttributesValues(),
      ...(folder.limit ? { Limit: folder.limit } : {}),
    };

    const { Items } = await db.query(params).promise();

    return Items;
  };

  return {
    putFolder,
    queryFolder,
  };
}
