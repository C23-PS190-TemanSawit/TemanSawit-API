import dotenv from 'dotenv';
dotenv.config();
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: process.env.GCS_KEY,
  projectId: process.env.GCS_PROJECTID,
});

export default storage;
