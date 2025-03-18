const connectDB = require('./src/config/database');
const clientRoutes = require('./src/routes/clientRoutes');
const lawyerRoutes = require('./src/routes/lawyerRoutes');
const processRoutes = require('./src/routes/processRoutes');
const express = require('express')

const app = express()
const port = 3000

connectDB();

app.use(express.json());

app.use('/client', clientRoutes);
app.use('/lawyer', lawyerRoutes);
app.use('/process', processRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
