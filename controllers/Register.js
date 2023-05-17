import Users from '../models/UserModels.js';
import bycrypt from 'bcrypt';

// Register Functions
export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: 'Password tidak cocok, silahkan masukkan kembali password anda' });
  const salt = await bycrypt.genSalt();
  const hashPassword = await bycrypt.hash(password, salt);
  try {
    // Validation duplicate username
    const existingnameUser = await Users.findOne({
      where: {
        name: name,
      },
    });
    if (existingnameUser) {
      return res.status(400).json({ msg: 'Username sudah terdaftar' });
    }
    // Validation duplicate email
    const existingemailUser = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (existingemailUser) {
      return res.status(400).json({ msg: 'Email sudah terdaftar' });
    }
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: 'Registrasi berhasil' });
  } catch (error) {
    res.status(500).json({ msg: 'Terjadi kesalahan saat melakukan registrasi' });
  }
};
