const authServices = require('../services/authServices');

exports.register = async (req, res) => {
  try {
    const { name, cpf, email, telefone, password, isAdmin } = req.body;
    const user = await authServices.register(name, cpf, email, telefone, password, isAdmin);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};