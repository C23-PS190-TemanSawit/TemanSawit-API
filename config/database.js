import { Sequelize } from 'sequelize';

const db = new Sequelize('temansawit_db', 'root', 'Pass1234.', {
  host: '34.116.110.121',
  dialect: 'mysql',
});

export default db;
