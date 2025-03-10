const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

dotenv.config();

exports.register = async ( name, cpf, email, telefone, password, isAdmin ) => {
  const existingUser = await User.findOne ({ cpf });
  if (existingUser) { throw new Error('User already exists'); }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({  name, cpf, email, telefone, password: hashedPassword, isAdmin });
  
  return newUser.save();
}
