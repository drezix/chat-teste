const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;

const connectDB = async () => {
  try{
    await mongoose.connect(`mongodb+srv://${dbuser}:${dbpassword}@cluster0.3bcl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
      console.log('Connected to the database');
  } catch (error) {
    console.log('Error connecting to the database', error);
    process.exit(1);
  }

  mongoose.connection.on('error', err => {
    logError(err);
  });
};

module.exports = connectDB;