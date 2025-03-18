const Process = require('../models/processModel');
const mongoose = require('mongoose');

exports.insertProcess = async  (data) => {
  const { processNumber, client, lawyer, status } = data;
  const existingProcess = await Process.findOne({
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

exports.getProcess = async (processId) => {
  if (!mongoose.Types.ObjectId.isValid(processId)) {
    throw new Error('Invalid process ID');
  }
  return await Process.findById(processId);
}

exports.deleteProcess = async (processId) => {
  if (!mongoose.Types.ObjectId.isValid(processId)) {
    throw new Error('Invalid process ID');
  }
  const process = await Process.findByIdAndDelete(
    processId
  );

  if (!process) {
    throw new Error('Process not found');
  }
  return process;
}