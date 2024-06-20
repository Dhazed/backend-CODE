const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const { verifyToken } = require('../controllers/auth');

router.get('/', verifyToken, bookController.getBooks);
router.get('/:id', verifyToken, bookController.getBookById);
router.post('/', verifyToken, bookController.createBook);
router.put('/:id', verifyToken, bookController.updateBookById);
router.delete('/:id', verifyToken, bookController.deleteBookById);

module.exports = router;
