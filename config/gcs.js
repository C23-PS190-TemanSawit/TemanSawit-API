import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: 'test-1.json',
  projectId: 'my-project-388403',
});

export default storage;
