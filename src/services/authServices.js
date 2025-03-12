const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

dotenv.config();

exports.register = async ( name, cpf, email, telefone, password, isAdmin ) => {
  const existingCPF = await User.findOne ({ cpf });
  if (existingCPF) { throw new Error('User already exists'); }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({  name, cpf, email, telefone, password: hashedPassword, isAdmin });
  
  return newUser.save();
}

exports.login = async (cpf, password) => {
  const user = await User.findOne({ cpf });
  if (!user) throw new Error('CPF nao encontrado');

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw new Error('Senha incorreta');

  return user;
}
