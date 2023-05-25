import util from 'util';
import multer from 'multer';

const size = 5 * 1024 * 1024;

let processFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: size },
}).single('file');

let processFileMiddleware = util.promisify(processFile);
export default processFileMiddleware;
