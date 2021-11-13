import dynamodbFactory from '@/composables/use-dynamodb-factory';
import tables from '@/utils/tables';

export default function folderModel(folder) {
  const { doc } = dynamodbFactory();
  const db = doc();

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
      KeyConditionExpression: 'userId = :userId AND folderId = :folderId',
      ExpressionAttributeValues: {
        ':userId': folder.userId,
        ':folderId': folder.folderId,
      },
    };

    const { Items } = await db.query(params).promise();

    return Items;
  };

  return {
    putFolder,
    queryFolder,
  };
}
