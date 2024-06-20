const express = require('express');
require('dotenv').config();

const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const authRoutes = require('./routes/auth.route');

const { sequelize } = require('../models/index'); // Consolidato

//const logger = require('./middleware/logger');

const app = express();

//app.use(logger);
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);

// Sincronizzazione delle tabelle
sequelize.sync().then(() => {
  console.log('Database e tabelle create');
}).catch(err => {
  console.error('Errore nella sincronizzazione del database:', err);
});

app.get('/', (req, res) => {
  res.send({ message: 'API di root ( / ) non implementata!' });
});

module.exports = app;
