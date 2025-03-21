const mongoose = require('mongoose');

const processSchema = new mongoose.Schema({
  processNumber: {
    type: Number,
    required: true,
    unique: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
    unique: true
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lawyer',
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Process', processSchema);