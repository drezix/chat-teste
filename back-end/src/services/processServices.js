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

exports.getProcess = async (processNumber) => {
  if (!processNumber) {
    throw new Error('Invalid process number');
  }
  return await Process.findOne({ processNumber });
}

exports.deleteProcess = async (processNumber) => {
  if (!processNumber) {
    throw new Error('Invalid process ID');
  }
  const process = await Process.findOneAndDelete(
    {
      processNumber
    }
  );

  if (!process) {
    throw new Error('Process not found');
  }
  return process;
}