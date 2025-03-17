const connectDB = require('./src/config/database');
const clientRoutes = require('./src/routes/clientRoutes');
const lawyerRoutes = require('./src/routes/lawyerRoutes');
const express = require('express')

const app = express()
const port = 3000

connectDB();

app.use(express.json());

app.use('/user', clientRoutes);
app.use('/lawyer', lawyerRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
