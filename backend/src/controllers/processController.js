const processService = require('../services/processServices');
const redisClient = require('../config/redisConfig');

exports.insert = async (req, res) => {
  try {
    const clientCpf = req.body.clientCpf;
    const lawyerOab = req.body.Oab;
    const processData = {...req.body, client: clientCpf, lawyer: lawyerOab};

    const process = await processService.insertProcess(processData);

    const cacheKey = `processes:${process}`;
    await redisClient.del(cacheKey);

    return res.status(201).json(process);
  }
  catch (error) {
    return res.status(500).json({ message: 'Error inserting process', error: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const processNumber = req.params.processNumber
    const cacheKey = `processes:${processNumber}`;

    const cachedProcesses = await redisClient.get(cacheKey);
    if (cachedProcesses) {
      console.log('Retornando processos  do cache');
      return res.status(200).json(JSON.parse(cachedProcesses));
    }

    const process = await processService.getProcess(processNumber);

    await redisClient.set(cacheKey, JSON.stringify(process), { EX: 3600 });
        console.log('Retornando processos  do banco e armazenando no cache');

    return res.status(200).json(process);
  }
  catch (error) {
    return res.status(500).json({ message: 'Error getting process', error: error.message });
  } 
}

exports.delete = async (req, res) => {
  try {
    const processNumber = req.params.processNumber;

    const process = await processService.deleteProcess(processNumber);

    const cacheKey = `processes:${processNumber}`;
        await redisClient.del(cacheKey);

    return res.status(200).json(process);
  }
  catch (error) {
    return res.status(500).json({ message: 'Error deleting process', error: error.message });
  }
}