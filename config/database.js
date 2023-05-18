import { Sequelize } from 'sequelize';

const db = new Sequelize('temansawit-db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
