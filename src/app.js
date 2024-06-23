const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const process = require('process');
const config = require('./config/config');
const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const authRouter = require('./routes/auth.route');
//const User = require('./models/userModel'); 

if (cluster.isMaster){
    console.log(`Master ${process.pid} is running`);
    // User.sync().then(() => {
    //     console.log('User Table syncronized!'); 
    //     });

    for (let i=0; i < numCPUs; i++ ){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal)=>{
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(express.json());
    app.use('/api/user', userRouter);
    app.use('/api/book', bookRouter);
    //app.use('/api/auth', authRouter);
    app.get('/', (req,resp) => {
        resp.send({message: 'API di root ( / ) non implementata!', pid: process.pid})
    });//pid: nuova proprietà dell'oggetto  

    module.exports = app;
    //const sequelize = require('./config/database'); 

    const port = config.serverPort || 3000;
    app.listen(port, console.log(`App listening in port ${port}`));
}




