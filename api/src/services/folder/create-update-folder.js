import { formatISO } from 'date-fns';
import folderModel from '@/models/folder';
import useError from '@/composables/use-error';

const { badRequestError } = useError();

async function createFolder(folder) {
  const { putFolder } = folderModel(folder);

  return putFolder();
}

function formatId({ name, date }) {
  const normalizedString = name
    .toLowerCase()
    .replace(/ /g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return `folder-${normalizedString}-${date}`;
}

function mountFolderObj(folder) {
  const folderObj = {
    userId: folder.userId,
    folderId: folder.folderId || formatId(folder),
    name: folder.name,
    date: folder.date,
    createdAt: folder.createdAt || formatISO(new Date()),
    updatedAt: formatISO(new Date()),
  };

  return folderObj;
}

async function validateExistingFolder(folder) {
  const { queryFolder } = folderModel(folder);

  const folderFound = await queryFolder();

  return Array.isArray(folderFound) && folderFound.length;
}

export default async function createUpdateFolder(folder) {
  const mountedFolder = mountFolderObj(folder);

  if (await validateExistingFolder(mountedFolder)) throw badRequestError('Pasta já criada!');

  const response = await createFolder(mountedFolder);

  return response;
}
