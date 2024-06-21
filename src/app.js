const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const process = require('process');
const express = require('express');
require('dotenv').config();

const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const authRoutes = require('./routes/auth.route');

const { sequelize } = require('../models/index');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Sincronizzazione delle tabelle
  sequelize.sync()
    .then(() => {
      console.log('Database e tabelle sincronizzate');
    })
    .catch(err => {
      console.error('Errore nella sincronizzazione del database:', err);
    });

  // Creazione dei worker
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();

  // Middleware per il logging (può essere attivato se necessario)
  // const logger = require('./middleware/logger');
  // app.use(logger);

  // Middleware per il parsing del JSON
  app.use(express.json());

  // Definizione delle rotte
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRouter);
  app.use('/api/book', bookRouter);

  app.get('/', (req, res) => {
    res.send({ message: `API di root ( / ) non implementata! by ${process.pid}`});
  });

  const port = process.env.SERVER_PORT || 3000;
  app.listen(port, () => console.log(`Server in ascolto sulla porta: ${port}`));

  
  module.exports = app;
}


