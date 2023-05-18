// import model from '../models/index.js';
// import Income from '../models/IncomeModels.js';

// // create a new income record
// export const postIncome = async (req, res) => {
//   const { transaction_time, price, sales_weight, description, total_income } = req.body;
//   try {
//     await Income.create({
//       transaction_time: transaction_time,
//       price: price,
//       sales_weight: sales_weight,
//       description: description,
//       total_income: total_income,
//     });
//     res.status(200).json({ msg: 'Berhasil menambah transaksi' });
//   } catch (error) {
//     res.status(500).json({ msg: 'Gagal menambah transaksi' });
//   }
// };

// // Get all income records
// export const getAllIncome = async (req, res) => {
//   try {
//     const incomes = await model.Income.findAll();
//     include: [
//       {
//         model: model.Users,
//       },
//     ];
//     res.json(incomes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export { getAllIncome };
