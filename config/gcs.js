import { Storage } from '@google-cloud/storage';

const serviceKey = 'gcs-test.json';
const projectId = 'testing-project-387702';

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: projectId,
});

export default storage;
