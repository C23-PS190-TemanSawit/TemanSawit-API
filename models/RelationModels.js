import Users from './allModels/UserModels.js';
import Incomes from './allModels/IncomeModels.js';

const Relations = () => {
  Incomes.hasMany(Users, { foreignKey: 'userId' });
  Incomes.belongsTo(Users, { foreignKey: 'userId' });
};

export default Relations;
