const processService = require('../services/processServices');

exports.insert = async (req, res) => {
  try {
    const userId = req.userId;
    const lawyerId = req.lawyerId;
    const processData = {...req.body, userId, lawyerId};

    const process = await processService.insert(processData);

    return res.status(201).json(process);
  }
  catch (error) {
    return res.status(500).json({ message: 'Error inserting process', error: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const clientId = req.clientId;
    const processId = req.process.id;

    const process = await processService.get(clientId, processId);

    return res.status(200).json(process);
  }
  catch (error) {
    return res.status(500).json({ message: 'Error getting process', error: error.message });
  }
}

exports.delete = async (req, res) => {
  try {
    const processId = req.process.id;

    const process = await processService.delete(processId);

    return res.status(200).json(process);
  }
  catch (error) {
    return res.status(500).json({ message: 'Error deleting process', error: error.message });
  }
}