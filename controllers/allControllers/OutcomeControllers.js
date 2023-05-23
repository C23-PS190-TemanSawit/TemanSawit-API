import model from '../../models/index.js';
const controller = {};

//Create a new Outcomes transaction
controller.postOutcome = async (req, res) => {
  // If already login, create a new transaction outcome object
  try {
    const { transaction_time, total_outcome, description } = req.body;
    const userId = req.userId;
    await model.Outcomes.create({
      transaction_time: transaction_time,
      total_outcome: total_outcome,
      description: description,
      userId: userId,
    });
    res.status(200).json({ msg: 'Berhasil menambah transaksi' });
  } catch (error) {
    res.status(500).json({ msg: 'transaksi tidak ditemukan' });
  }
};

//Get all user transaction
controller.getUserOutcome = async (req, res) => {
  try {
    const userId = req.userId;
    const outcome = await model.Outcomes.findAll({
      include: [
        {
          model: model.Users,
          where: {
            userId: userId,
          },
        },
      ],
    });
    res.status(200).json(outcome);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Gagal mendapatkan transaksai' });
  }
};

// Get user outcome by ID
controller.getOutcomeByID = async (req, res) => {
  try {
    const { outcomeId } = req.params;
    const transaction = await model.Outcomes.findAll({
      where: { outcomeId },
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

// Sort outcome by creation time
controller.sortOutcomeByTime = async (req, res) => {
  try {
    const userId = req.userId;
    const transaction = await model.Outcomes.findOne({
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
