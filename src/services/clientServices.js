const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Client = require('../models/clientModel');

dotenv.config();

function formatCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) {
    return cpf;
  }
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1$2$3$4');
}

function formatRG(rg) {
  rg = rg.replace(/\D/g, '');
  if (rg.length !== 9) {
    return rg;
  }
  return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1$2$3$4');
}

function formatNumber(telefone) {
  telefone = telefone.replace(/\D/g, '');
  if (telefone.length !== 11) {
    return telefone;
  }
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '$1$2$3');
}

exports.register = async ( name, cpf, rg, email, telefone, password, isAdmin ) => {
  const formattedCpf = formatCPF(cpf);
  const formattedRg = formatRG(rg);
  const formattedNumber = formatNumber(telefone);
  
  const existingCPF = await Client.findOne ({ cpf: formattedCpf });
  if (existingCPF) { throw new Error('Client already exists'); }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newClient = new Client({  
    name, 
    cpf: formattedCpf, 
    rg: formattedRg,
    email,
    telefone: formattedNumber, 
    password: hashedPassword, 
    isAdmin });
  
  return newClient.save();
}

exports.login = async (cpf, password) => {
  const client = await Client.findOne({ cpf });
  if (!client) throw new Error('CPF nao encontrado');

  const isPasswordCorrect = await bcrypt.compare(password, client.password)
  if (!isPasswordCorrect) throw new Error('Senha incorreta');

  const token = jwt.sign({ cpf: client.cpf, id: client._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {client, token};
}

