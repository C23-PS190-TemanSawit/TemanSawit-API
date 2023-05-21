import model from '../../models/index.js';
const controller = {};

//Create a new incomes transaction
controller.postIncome = async (req, res) => {
  // If already login, create a new transaction Income object
  try {
    const { transaction_time, price, total_weight, description } = req.body;
    const userId = req.userId;
    await model.Incomes.create({
      transaction_time: transaction_time,
      price: price,
      total_weight: total_weight,
      description: description,
      userId: userId,
    });
    res.status(200).json({ msg: 'Berhasil menambah transaksi' });
  } catch (error) {
    res.status(500).json({ msg: 'transaksi tidak ditemukan' });
  }
};

//Get all transaction
controller.getUserIncome = async (req, res) => {
  try {
    const userId = req.userId;
    const income = await model.Incomes.findAll({
      include: [
        {
          model: model.Users,
          where: {
            userId: userId,
          },
        },
      ],
    });
    res.status(200).json(income);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Gagal mendapatkan transaksai' });
  }
};

// Get Income by ID
controller.getIncomeByID = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const transaction = await model.Incomes.findAll({
      where: { incomeId },
      include: [
        {
          model: model.Users,
        },
      ],
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ msg: 'Gagal mendapatkan transaksai' });
  }
};

// Sort Incomes by creation time
controller.sortIncomeByTime = async (req, res) => {
  try {
    const userId = req.userId;
    const transaction = await model.Incomes.findOne({
      where: {
        userId: userId,
      },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ msg: 'Gagal mendapatkan transaksai' });
  }
};

export default controller;
