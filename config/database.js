import { Sequelize } from 'sequelize';

const db = new Sequelize('temansawit_db', 'root', 'Pass.1234', {
  host: '34.101.234.229',
  dialect: 'mysql',
});

export default db;
