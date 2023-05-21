import { DataTypes } from "sequelize";
import db from "../../config/database.js";
import Users from "./UserModels.js";

const Outcomes = db.define(
    'outcomes',
    {
      outcomeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      transaction_time: {
        type: DataTypes.DATEONLY,
      },
      total_outcome: {
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

// Create one to many relationships between users and outcomes
Users.hasOne(Outcomes, { foreignKey: 'userId' });
Outcomes.belongsTo(Users, { foreignKey: 'userId' });

export default Outcomes;
