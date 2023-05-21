import Users from './allModels/UserModels.js';
import Incomes from './allModels/IncomeModels.js';

const Relations = () => {
  Incomes.hasMany(Users, { foreignKey: 'userId', as: 'users'});
  Users.belongsTo(Incomes, { foreignKey: 'userId', as: 'incomes'});
};

export default Relations;
