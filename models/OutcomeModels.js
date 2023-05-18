import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import Users from './UserModels.js';
const { DataTypes } = Sequelize;

const Outcome = db.define(
  'outcomes',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_time: {
      type: DataTypes.DATE,
    },
    descriptions: {
      type: DataTypes.STRING,
    },
    total_outcome: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
  }
);

//satu pengeluaran hanya dimiliki satu user dan satu pengeluaran hanya dimiliki oleh user tersebut
Outcome.hasOne(Users, { foreignKey: 'userId'});
Outcome.belongsTo(Users, { foreignKey: 'userId'});

export default Outcome;