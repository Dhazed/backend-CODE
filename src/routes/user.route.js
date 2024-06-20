const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../controllers/auth')


router.get('/', verifyToken, userController.getUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.post('/', verifyToken, userController.createUser);
router.put('/:id', verifyToken, userController.updateUserById);
router.delete('/:id', verifyToken, userController.deleteUserById);

module.exports = router;

