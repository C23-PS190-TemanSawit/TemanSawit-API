import model from '../../models/index.js';
const controller = {};

// Get Users
controller.getUsers = async (req, res) => {
  try {
    const users = await model.Users.findAll({
      attributes: ['userId', 'username', 'email'],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Gagal mendapatkan user' });
  }
};

// Update users password
controller.updatePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    const user = await model.Users.findByPk(userId);
    if (!user) return res.status(404).json({ msg: 'Username tidak ditemukan' });

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ msg: 'Password saat ini tidak valid, silakan coba lagi' });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();

    res.json({ msg: 'Password berhasil diperbarui' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Terjadi kesalahan saat memperbarui password' });
  }
};

export default controller;
