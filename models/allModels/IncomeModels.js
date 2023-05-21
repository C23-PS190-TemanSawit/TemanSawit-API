import { DataTypes } from 'sequelize';
import db from '../../config/database.js';
import Users from './UserModels.js';

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
  },
  {
    freezeTableName: true,
  }
);

// Create one to many relationships between users and incomes
Users.hasOne(Incomes, { foreignKey: 'userId' });
Incomes.belongsTo(Users, { foreignKey: 'userId' });

export default Incomes;
