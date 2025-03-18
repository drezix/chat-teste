const Process = require('../models/processModel');

exports.insertProcess = async (processNumber, client, lawyer, status) => {
  const existingProcess = Process.findOne({
    processNumber
  });
  if (existingProcess) {
    throw new Error('Process already exists');
  }

  const newProcess = new Process({
    processNumber,
    client,
    lawyer,
    status
  });
  return await newProcess.save();
}

exports.getProcess = async (processNumber) => {
  return await processProcess.findOne({ processNumber });
}

exports.deleteProcess = async (processNumber) => {
  const process = await Process.findOneAndDelete({
    processNumber
  });

  if (!process) {
    throw new Error('Process not found');
  }
  return process;
}