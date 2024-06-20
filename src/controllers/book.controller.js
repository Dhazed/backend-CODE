const { Book } = require('../../models/index');

async function getBooks(req, res) {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore nel recuperare i libri dal database' });
  }
}

async function getBookById(req, res) {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).send({ message: 'Libro non trovato' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore nel recuperare il libro dal database' });
  }
}

async function createBook(req, res) {
  try {
    const { titolo, autore } = req.body;
    const newBook = await Book.create({ titolo, autore });
    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore durante la creazione del libro nel database' });
  }
}

async function updateBookById(req, res) {
  try {
    const bookId = req.params.id;
    const updatedBook = await Book.update(req.body, { where: { id: bookId } });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore nell\'aggiornare il libro nel database' });
  }
}

async function deleteBookById(req, res) {
  try {
    const bookId = req.params.id;
    await Book.destroy({ where: { id: bookId } });
    res.status(200).send({ message: 'Libro cancellato correttamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore nella cancellazione del libro nel database' });
  }
}

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
