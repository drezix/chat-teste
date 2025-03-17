const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Lawyer = require('../models/lawyerModel');

dotenv.config();

function formatOAB(oab) {
  oab = oab.replace(/\W/g, '');
  
  if (!/^[A-Za-z]{2}\d{6}$/.test(oab)) {
    return oab;
  }
  return oab.replace(/(\d{2})(\d{6})/, '$1$2');
}

function formatNumber(telefone) {
  telefone = telefone.replace(/\D/g, '');
  if (telefone.length !== 11) {
    return telefone;
  }
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '$1$2$3');
}

exports.register = async ( name, oab, email, telefone, password, isAdmin ) => {
  const formattedOAB = formatOAB(oab);
  const formattedNumber = formatNumber(telefone);
  
  const existingOAB = await Lawyer.findOne ({ oab: formattedOAB });
  if (existingOAB) { throw new Error('Lawyer already exists'); }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newLawyer = new Lawyer({  
    name, 
    oab: formattedOAB,
    email,
    telefone: formattedNumber, 
    password: hashedPassword, 
    isAdmin });
  
  return newLawyer.save();
}

exports.login = async (oab, password) => {
  const lawyer = await Lawyer.findOne({ oab });
  if (!lawyer) throw new Error('OAB não encontrado');

  const isPasswordCorrect = await bcrypt.compare(password, lawyer.password)
  if (!isPasswordCorrect) throw new Error('Senha incorreta');

  const token = jwt.sign({ oab: lawyer.oab, id: lawyer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {lawyer, token};
}