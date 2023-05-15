import Users from '../models/UserModels.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Get Users
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'name', 'email'],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

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

// Login Functions
export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        name: req.body.name,
      },
    });
    const match = await bycrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: 'Password salah' });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const acccessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20s',
    });
    const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ acccessToken });
  } catch (error) {
    res.status(404).json({ msg: 'Username tidak ditemukan' });
  }
};

// Logout function
export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refreshToken: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie('refreshToken');
  return res.sendStatus(200).json({ msg: 'Logout berhasil' });
};
