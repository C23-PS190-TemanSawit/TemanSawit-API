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
    res.status(200).json({
      status: 'success',
      message: 'Berhasil menambah transaksi',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'transaksi tidak ditemukan',
    });
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
    res.status(500).json({
      status: 'fail',
      message: 'Gagal mendapatkan transaksi',
    });
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
          attributes: ['userId'],
        },
      ],
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Gagal mendapatkan transaksi',
    });
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
    res.status(500).json({
      status: 'fail',
      message: 'Gagal mendapatkan transaksi',
    });
  }
};

// Update old outcome with new outcome
controller.updateOutcome = async (req, res) => {
  try {
    const { outcomeId } = req.params;
    const { transaction_time, total_outcome, description } = req.body;
    const userId = req.userId;
    // Check if the old outcome exists and belongs to the user
    const existingOutcome = await model.Outcomes.findOne({
      where: { outcomeId: outcomeId, userId: userId },
    });
    if (!existingOutcome) {
      return res.status(404).json({
        status: 'fail',
        message: 'Transaksi tidak ditemukan',
      });
    }
    // Cek if one of the fields is empty
    if (!transaction_time) {
      return res.status(404).json({
        status: 'fail',
        message: 'Mohon tambahkan tanggal transaksi',
      });
    } else if (!total_outcome) {
      return res.status(404).json({
        status: 'fail',
        message: 'Mohon tambahkan berat transaksi',
      });
    } else if (!description) {
      return res.status(404).json({
        status: 'fail',
        message: 'Mohon tambahkan deskripsi transaksi',
      });
    }
    // Update the existing outcome with new values
    await model.Outcomes.update(
      {
        transaction_time: transaction_time,
        total_outcome: total_outcome,
        description: description,
      },
      {
        where: { outcomeId: outcomeId },
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Transaksi berhasil diperbarui',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Gagal memperbarui transaksi',
    });
  }
};

// Delete Outcome by ID
controller.deleteOutcome = async (req, res) => {
  try {
    const { outcomeId } = req.params;
    const userId = req.userId;

    // Check if the outcome exists and belongs to the user
    const existingOutcome = await model.Outcomes.findOne({
      where: { outcomeId: outcomeId, userId: userId },
    });

    if (!existingOutcome) {
      return res.status(404).json({
        status: 'fail',
        message: 'Transaksi tidak ditemukan',
      });
    }

    // Delete the outcome
    await model.Outcomes.destroy({
      where: { outcomeId: outcomeId },
    });

    res.status(200).json({
      status: 'success',
      message: 'Transaksi berhasil dihapus',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Gagal menghapus transaksi',
    });
  }
};

export default controller;
