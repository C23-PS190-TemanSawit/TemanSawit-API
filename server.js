import express from 'express';
import db from './config/database.js';
const app = express();
const port = 8080;

try {
  await db.authenticate();
  console.log('db connected');
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log('listening on port ', port);
});
