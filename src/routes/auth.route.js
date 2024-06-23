// /* definiamo le rotte di autenticazione utilizzando router express.js. 
// colleghiamo il router alle funzioni del controller di autenticazione per gestire 
// le richieste di registrazione, login e  protezione delle rotte*/

// const express = require ('express');
// const {register, login, verifyToken} = require('../controllers/auth.controller');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get('/protected', verifyToken, (req,res)=>{
//     res.send('This is a protected route');
// });

// router.post('/renew', verifyToken, (req, res)=>{
//     const {username} = req.user;
//     const newToken = jwt.sign ({username}, 'secretKey', {expiresIn: '1h'});
//     res.json({token: newToken});
// });

// module.exports = router;