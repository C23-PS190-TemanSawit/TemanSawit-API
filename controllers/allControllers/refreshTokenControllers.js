import model from '../../models/index.js';
import jwt from 'jsonwebtoken';
const controller = {};

controller.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await model.Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const userId = user[0].userId;
      const name = user[0].name;
      const email = user[0].email;
      const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h',
      });
      res.json({
        status: 'success',
        accessToken,
      });
    });
  } catch (error) {
    res.json({
      status: 'fail',
      message: 'Gagal mendapatkan token',
    });
  }
};

export default controller;
