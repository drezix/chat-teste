const processService = require('../services/processServices');

exports.insert = async (req, res) => {
  try {
    const lawyerId = req.user.id;
    const processData = {...req.body, lawyer: lawyerId};

    const process = await processService.insertProcess(processData);

    return res.status(201).json(process);
  }
  catch (error) {
    return res.status(500).json({ message: 'Error inserting process', error: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const processId = req.params.id;

    const process = await processService.getProcess(processId);

    return res.status(200).json(process);
  }
  catch (error) {
    return res.status(500).json({ message: 'Error getting process', error: error.message });
  } 
}

exports.delete = async (req, res) => {
  try {
    const processId = req.params.id;

    const process = await processService.deleteProcess(processId);

    return res.status(200).json(process);
  }
  catch (error) {
    return res.status(500).json({ message: 'Error deleting process', error: error.message });
  }
}