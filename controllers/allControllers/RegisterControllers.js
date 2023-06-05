import model from '../../models/index.js';
import bcrypt from 'bcrypt';
const controller = {};

// Register Functions
controller.Register = async (req, res) => {
  const { username, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({
      status: 'fail',
      message: 'Password tidak cocok, silahkan masukkan kembali password anda',
    });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    // Validation duplicate username
    const existingnameUser = await model.Users.findOne({
      where: {
        username: username,
      },
    });
    if (existingnameUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'Username sudah terdaftar',
      });
    }
    await model.Users.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.json({
      status: 'success',
      message: 'Registrasi berhasil',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Terjadi kesalahan saat melakukan registrasi',
    });
  }
};

export default controller;
