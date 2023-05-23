import model from '../../models/index.js';
import bcrypt from 'bcrypt';
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
  const userId = req.userId;
  let { password, newPassword, confPassword } = req.body;
  try {
    const user = await model.Users.findOne({
      id: userId,
    });
    // Cek current password is match
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Password yang anda masukkan salah' });

    // Cek updated password match with confirm password
    if (newPassword !== confPassword) return res.status(400).json({ msg: 'Password tidak cocok, silahkan masukkan kembali password anda' });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await model.Users.update(
      { password: hashPassword },
      {
        where: {
          userId: userId,
        },
      }
    );
    await user.save();
    return res.status(200).json({ msg: 'Update password berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Terjadi kesalahan saat update password' });
  }
};

export default controller;
