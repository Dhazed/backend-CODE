// /*controllo di autenticazione per gestire registrazione, login e verifica dei token*/

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// //salvataggio su database e non json
// const User = require('../models/userModel');


// exports.register = async (req,res) => {
//     try {
//         const {username, password, email} = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({name: username, email: email, password: hashedPassword}); 
//         console.log(user.toJSON());
//         res.status(201).send('User registered');   
//     } catch (error) {
//         res.status(500).send('Errore: '+ error)     
//     }   
// };

// exports.login = async (req, res) => {
//     const {username, password, email} = req.body;
//     const user = await User.findAll ();
//     console.log(email+'->'+user[0].password);
//     if (user && await bcrypt.compare(password, user[0].password)){
//         const token = jwt.sign({username}, 'secretKey', {expiresIn: '1h'});
//         res.json({token});
//     }else{
//         res.status(401).send('Invalid credentials');
//     }
// };

// exports.verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if(!token){
//         return res.status(403).send('A token is required');
//     }
//     try {
//         const decoded = jwt.verify(token, 'secretKey');
//         req.user = decoded;
//     } catch (err) {
//         return res.status(401).send('Invalid Token');
//     }
//     return next();
// };