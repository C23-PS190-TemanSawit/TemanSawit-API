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
    res.status(500).json({ msg: 'Gagal menambah transaksi' });
  }
};

//Get all user transaction
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

// Get user income by ID
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

// Update old income with new income
controller.updateIncome = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const { transaction_time, price, total_weight, description } = req.body;
    const userId = req.userId;
    // Check if the old income exists and belongs to the user
    const existingIncome = await model.Incomes.findOne({
      where: { incomeId: incomeId, userId: userId },
    });
    if (!existingIncome) {
      return res.status(404).json({ msg: 'Transaksi tidak ditemukan' });
    }
    // Cek if one of the fields is empty
    if (!transaction_time) {
      return res.status(404).json({ msg: 'Mohon tambahkan tanggal transaksi' });
    } else if (!price) {
      return res.status(404).json({ msg: 'Mohon tambahkan harga transaksi' });
    } else if (!total_weight) {
      return res.status(404).json({ msg: 'Mohon tambahkan berat transaksi' });
    } else if (!description) {
      return res.status(404).json({ msg: 'Mohon tambahkan deskripsi transaksi' });
    }
    // Update the existing income with new values
    await model.Incomes.update(
      {
        transaction_time: transaction_time,
        price: price,
        total_weight: total_weight,
        description: description,
      },
      {
        where: { incomeId: incomeId },
      }
    );

    res.status(200).json({ msg: 'Transaksi berhasil diperbarui' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Gagal memperbarui transaksi' });
  }
};

export default controller;
