import { Sequelize } from 'sequelize';

const db = new Sequelize('temansawit_db', 'root', 'Pass1234.', {
  host: '34.151.127.29',
  dialect: 'mysql',
});

export default db;
