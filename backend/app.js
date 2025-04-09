const connectDB = require('./src/config/db');
const clientRoutes = require('./src/routes/clientRoutes');
const lawyerRoutes = require('./src/routes/lawyerRoutes');
const processRoutes = require('./src/routes/processRoutes');

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const fs = require('fs');
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(process.env.CERTIFICATE_PATH, 'utf8');
const credentials = {key: privateKey, cert: certificate};

const express = require('express');
const app = express();

connectDB();

const cors = require('cors');
app.use(cors());
app.use(cors({
  origin: 'https://rcsadvocacia.local:8443', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

//--------------------------------------------CLIENT------------------------------------------------
app.use('/client', clientRoutes);

//--------------------------------------------LAWYER------------------------------------------------
app.use('/lawyer', lawyerRoutes);

//--------------------------------------------PROCESS-----------------------------------------------
app.use('/process', processRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const http = require('http');
const https = require('https');

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

module.exports = app;