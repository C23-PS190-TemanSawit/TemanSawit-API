import { Sequelize } from 'sequelize';

const db = new Sequelize('temansawit-db', 'falach', '123', {
  host: '34.101.253.113',
  dialect: 'mysql',
});

export default db;
