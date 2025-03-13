const connectDB = require('./src/config/database');
const clientRoutes = require('./src/routes/clientRoutes');
const express = require('express')

const app = express()
const port = 3000

connectDB();

app.use(express.json());

app.use('/auth', clientRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
