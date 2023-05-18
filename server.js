import express from 'express';
import db from './config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';
// ### import DB models

dotenv.config();
const app = express();
const port = 8080;

try {
  await db.authenticate();
  console.log('db connected');
  // ### Command to create db
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log('listening on port ', port);
});
