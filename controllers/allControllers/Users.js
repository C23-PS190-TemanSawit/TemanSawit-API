import model from '../../models/index.js';
const controller = {};

// Get Users
controller.getUsers = async (req, res) => {
  try {
    const users = await model.Users.findAll({
      attributes: ['id', 'name', 'email'],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default controller;
