const express = require('express');
const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const authRouter = require('./routes/auth.route');
const app = express();

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);
app.use('/api/auth', authRouter);


app.get('/', (req,resp) => {
    resp.send({message: 'API di root ( / ) non implementata!'})
});

module.exports = app;

//const sequelize = require('./config/database'); 
const User = require('./models/userModel'); 
User.sync().then(() => {
    console.log('User Table syncronized!'); });
