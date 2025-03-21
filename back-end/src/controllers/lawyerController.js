const lawyerServices = require('../services/lawyerServices');

exports.register = async (req, res) => {
  try {
    const { name, oab, email, telefone, password, isAdmin } = req.body;
    const lawyer = await lawyerServices.register(name, oab, email, telefone, password, isAdmin);
    return res.status(201).json(lawyer);
  } catch (error) {
    return res.status(500).json({ message: 'Error registering lawyer', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const {oab, password} = req.body;
    const {lawyer, token} = await lawyerServices.login(oab, password);
    return res.status(200).json({lawyer, token});
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error: error.message });

  }
};