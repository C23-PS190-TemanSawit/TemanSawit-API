import model from "../../models/index.js";
const controller = {};

//Create a new incomes transaction
conntroller.postIncome = async (req, res) => {
    const { userId, transaction_time, price, total_weight, description } = req.body;
    try {
        await model.Incomes.create({
            userId: userId,
            transaction_time: transaction_time,
            price: price,
            total_weight: total_weight,
            description: description,
    });
    res.status(200).json({ msg: 'Berhasil menambah transaksi' });
  } catch (error) {
    res.status(500).json({ msg: 'Gagal menambah transaksi' });
  }
};

//Get all transaction
controller.getAllIncome = async (req, res) => {
    try {
      const income = await model.Incomes.findAll({
        include: [{ model: model.Users }],
       });
       res.json(income);
    }  catch (error) {
       console.error(error);
       res.status(500).json({ msg: 'Gagal mendapatkan transaksai' });
    }
};

export default controller;