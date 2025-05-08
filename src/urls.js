export const baseFileDetailsUrl = '/fileDetails';

const urls = {
  base: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  fileDetails: `${baseFileDetailsUrl}/:fileId`,
  uploadedFileDetails: '/uploadedFileDetails',
  privacy: '/privacy',
};

export default urls;
