import { DataTypes } from 'sequelize';
import db from '../../config/database.js';
import model from '../index.js';

const Incomes = db.define(
  'incomes',
  {
    incomeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_time: {
      type: DataTypes.DATEONLY,
    },
    price: {
      type: DataTypes.FLOAT(20),
    },
    total_weight: {
      type: DataTypes.FLOAT(20),
    },
    description: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
export default Incomes;
