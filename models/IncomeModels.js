import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Users from './UserModels.js';
const { DataTypes } = Sequelize;

const Income = db.define(
  'incomes',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_time: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    sales_weight: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
    },
    total_income: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
  }
);

//satu pemasukan hanya dimiliki satu user dan satu pemasukan hanya dimiliki oleh user tersebut
Income.hasOne(Users, { foreignKey: 'userId'});
Income.belongsTo(Users, { foreignKey: 'userId'});

export default Income;