const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const express = require('express')

const app = express()
const port = 3000

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
