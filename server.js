import express from 'express';
import db from './config/database.js';
import cors from 'cors';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();
const port = 8080;

try {
  await db.authenticate();
  console.log('db connected');
  // ### Command to create db
  // await db.sync({ force: true });
} catch (error) {
  console.log(error);
}
// Function to call relationships table
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});
