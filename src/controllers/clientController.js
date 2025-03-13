const clientServices = require('../services/clientServices');

exports.register = async (req, res) => {
  try {
    const { name, cpf, rg, email, telefone, password, isAdmin } = req.body;
    const client = await clientServices.register(name, cpf, rg, email, telefone, password, isAdmin);
    return res.status(201).json(client);
  } catch (error) {
    return res.status(500).json({ message: 'Error registering client', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const {cpf, password} = req.body;
    const {client, token} = await clientServices.login(cpf, password);
    return res.status(200).json({client, token});
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error: error.message });

  }
};