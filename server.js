import express from 'express';
import db from './config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';
import Incomes from './models/allModels/IncomeModels.js';
import Users from './models/allModels/UserModels.js';
//import Relations from './models/RelationModels.js';

dotenv.config();
const app = express();
const port = 8080;

try {
  await db.authenticate();
  console.log('db connected');
  // ### Command to create db
  //await db.sync({ force: true });
} catch (error) {
  console.log(error);
}
// Function to call relationships table
//Relations();
Incomes ();
Users ();
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log('listening on port ', port);
});
