import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Income from './IncomeModels.js';
import Outcome from './OutcomeModels.js';
const { DataTypes } = Sequelize;

const Users = db.define(
  'users',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

//satu user mungkin memiliki banyak pemasukan dan pengeluaran
Users.hasMany(Income);
Income.belongsTo(Users);
Users.hasMany(Outcome);
Outcome.belongsTo(Users);

export default Users;
