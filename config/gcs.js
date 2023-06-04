import dotenv from 'dotenv';
dotenv.config();
import { Storage } from '@google-cloud/storage';
import { writeFileSync } from 'node:fs';

writeFileSync('./temansawit-key.json', process.env.GCS_KEY);

const storage = new Storage({
  keyFilename: './temansawit-key.json',
  projectId: process.env.GCS_PROJECTID,
});

export default storage;
