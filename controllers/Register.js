import Users from '../models/UserModels.js';
import bycrypt from 'bcrypt';

// Register Functions
export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: 'Password tidak cocok, silahkan masukkan kembali password anda' });
  const salt = await bycrypt.genSalt();
  const hashPassword = await bycrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: 'Registrasi berhasil' });
  } catch (error) {
    console.log(error);
  }
};
