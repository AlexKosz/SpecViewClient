export const baseFileDetailsUrl = '/fileDetails';

const urls = {
  base: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  fileDetails: `${baseFileDetailsUrl}/:fileId`,
  uploadedFileDetails: '/uploadedFileDetails',
};

export default urls;
