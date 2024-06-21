const express = require('express');
const cluster = require('cluster');
const numCPU = require('os').cpus().length;
const process = require('process');
const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const authRouter = require('./routes/auth.route');
const config = require('./config/config'); 
const User = require('./models/user.model');

if (cluster.isMaster) {
    console.log('Master ${process.pid} is running');

    //const sequelize = require('./config/database');
     
User.sync().then(() => {
    console.log('User Table syncronized!'); 
});

    // fork worker process
    for (let i =0; i < numCPU; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ${worker.process.pid} died');
        cluster.fork(); // replace dead worker
    });
} else {
    const app = express();
    app.use(express.json());
    app.use('/api/user', userRouter);
    app.use('/api/book', bookRouter);
    app.use('/api/auth', authRouter);
    app.get('/', (req,resp) => {
    resp.send({message: 'API di root ( / ) non implementata!', pid: process.pid})
    });

module.exports = app;

    const port = config.serverPort || 3000;
    app.listen(port, console.log(`App listening in port ${port}`));
}



