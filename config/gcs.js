import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: 'gcs-test.json',
  projectId: 'testing-project-387702',
});

export default storage;
