const Client = require('../models/clientModel');
const Lawyer = require('../models/lawyerModel');
const Process = require('../models/processModel');

exports.insertProcess = async  (data) => {
  const { processNumber, clientCpf, lawyerOab, status } = data;
  const existingProcess = await Process.findOne({
    processNumber
  });
  if (existingProcess) {
    throw new Error('Process already exists');
  }

  const client = await Client.findOne({ cpf: clientCpf });
  if (!client) {
    throw new Error('Client not found');
  }

  const lawyer = await Lawyer.findOne({ oab: lawyerOab });
  if (!lawyer) {
    throw new Error('Lawyer not found');
  }

  const newProcess = new Process({
    processNumber,
    client: client._id,
    lawyer: lawyer._id,
    status
  });

  return await newProcess.save();
}

exports.getProcess = async (processNumber) => {
  if (!processNumber) {
    throw new Error('Invalid process number');
  }
  return await Process.findOne({ processNumber }).populate('client').populate('lawyer');
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