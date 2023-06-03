import dotenv from 'dotenv';
dotenv.config();
import { Storage } from '@google-cloud/storage';
import { writeFileSync } from 'node:fs';

writeFileSync('gcs-test.json', process.env.GCS_KEY);

const storage = new Storage({
  keyFilename: 'gcs-test.json',
  projectId: process.env.GCS_PROJECTID,
});

export default storage;
