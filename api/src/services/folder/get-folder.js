import { formatISO } from 'date-fns';
import folderModel from '@/models/folder';

async function getFolder({ userId, limit }) {
  const { queryFolder } = folderModel({ userId, limit });

  return queryFolder();
}

export default async function createUpdateFolder({ userId, limit }) {
  const response = await getFolder({ userId, limit });

  return response;
}
