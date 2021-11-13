import { formatISO } from 'date-fns';
import folderModel from '@/models/folder';

async function createFolder(folder) {
  const { queryFolder } = folderModel(folder);

  return queryFolder();
}

// function formatId(name) {
//   const normalizedString = name
//     .toLowerCase()
//     .replace(/ /g, '-')
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '');

//   return `folder-${normalizedString}`;
// }

// function mountFolderObj(folder) {
//   const folderObj = {
//     userId: folder.userId,
//     folderId: folder.folderId || formatId(folder.name),
//     name: folder.name,
//     createdAt: folder.createdAt || formatISO(new Date()),
//     updatedAt: formatISO(new Date()),
//     date: folder.date,
//   };

//   return folderObj;
// }

export default async function createUpdateFolder(folder) {
  const folderObj = mountFolderObj(folder);

  const response = await createFolder(folderObj);

  return response;
}
