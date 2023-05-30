import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: process.env.SERVICE_KEY,
  projectId: process.env.PROJECT_ID,
});

export default storage;
