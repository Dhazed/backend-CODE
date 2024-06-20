const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const process =require('process')
const express = require('express');
require('dotenv').config();

const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const authRoutes = require('./routes/auth.route');

const { sequelize } = require('../models/index'); 

if (cluster.isMaster) {
  console.log('Master' + process.pid+ ' is running');
  
  for(let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on( 'exit', (worker, code, signal) => {
    console.log('worker '+ worker.process.pid+ 'died')
    cluster.fork();
  })

} else {

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

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log(`Server in ascolto sulla porta: ${port}`));
}


