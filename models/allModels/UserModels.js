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
    fullName: {
      type: DataTypes.STRING(100),
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.STRING(10),
    },
    /*googleId: {
       type: DataTypes.STRING(100),
       allowNull: true,
    },*/
  },
  {
    freezeTableName: true,
  }
);

export default Users;
