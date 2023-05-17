import { Sequelize } from 'sequelize';
import db from '../config/database.js';
const { DataTypes } = Sequelize;

const Users = db.define(
  'users',
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },

  },
  {
    freezeTableName: true,
  }
);

export default Users;
