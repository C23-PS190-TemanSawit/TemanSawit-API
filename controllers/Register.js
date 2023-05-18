import Users from '../models/UserModels.js';
import bycrypt from 'bcrypt';

// Register Functions
export const Register = async (req, res) => {
  const { username, email, password, confPassword } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: 'Password tidak cocok, silahkan masukkan kembali password anda' });
  const salt = await bycrypt.genSalt();
  const hashPassword = await bycrypt.hash(password, salt);
  try {
    // Validation duplicate username
    const existingnameUser = await Users.findOne({
      where: {
        username: username,
      },
    });
    if (existingnameUser) {
      return res.status(400).json({ msg: 'Username sudah terdaftar' });
    }
    await Users.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: 'Registrasi berhasil' });
  } catch (error) {
    res.status(500).json({ msg: 'Terjadi kesalahan saat melakukan registrasi' });
  }
};
