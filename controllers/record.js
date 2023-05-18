import { Model, Sequelize } from "sequelize";
import db from "../config/database";
import Users from "../models/UserModels";
import Income from "../models/IncomeModels";
import Outcome from "../models/OutcomeModels";

const getAllIncome = async (req, res) => {
    try {
      const incomes = await Income.findAll();
      res.json(incomes);
      //belum jalan
      include: [
        {model: model.Users}
      ]
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export {
    getAllIncome,
}