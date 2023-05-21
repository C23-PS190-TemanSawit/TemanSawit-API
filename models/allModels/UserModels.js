import { DataTypes } from 'sequelize';
import db from '../../config/database.js';

const Users = db.define(
  'users',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(10),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    // googleId: {
    //   type: DataTypes.STRING(100),
    //   allowNull: true,
    // },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
