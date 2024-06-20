const fs = require('fs').promises;

//FUNZIONI INTERNE, NON COLLEGATE A NESSUN ENDPOINT API
const leggiBookDalFile =  () => {
  return fs.readFile('database/books.json',"utf8")
    .then((resp)=>{
      const data = JSON.parse(resp)
      return data; 
    }).catch((err)=>{
      return err;
    });
   
 
};
const scriviBookSulFile = async (data) => {
  try {
    await fs.writeFile('database/books'+'.json', JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error('Errore scrittura su file!!!!!!!!!!!', error)
    return false;
  }
};


//FUNZIONI API 
const findAll = async (req, res) => {
  const data = await leggiBookDalFile();
  res.status(200).json(data);
};

const findById = async (req, res) => {
  const idBook = req.params.id;
  const data = await leggiBookDalFile();
  const Book = data.books.find(user => user.id === parseInt(idBook, 10));
  if (Book) {
    res.status(200).json(Book);
  } else {
    res.status(404).send('404 - not found');
  }
};

const postById = async (req, res) => {
  try {
    const data = await leggiBookDalFile();
    const nuovoBookId = data.books.length + 1;
    
    const Book = req.body;
    Book.id = nuovoBookId;
    
    data.books.push(Book);
    const result = await scriviBookSulFile(data);
    if (result) {
      res.status(201).send({message: 'Book inserito correttamente'});
    }
    else {
      res.status(500).send({message: 'Errore inserimento Book'});
    }
   
  } catch (error) {
    console.log(error)
    res.status(500).send({message: 'Errore: ' + error});
  }
};

const updateById = async (req, res) => {
  const data = await leggiBookDalFile();
  const indiceBookTrovato = data.books.findIndex(user => user.id === parseInt(id, 10));
  if (indiceBookTrovato >= 0) {
      data.books[indiceBookTrovato] = req.body;
      await scriviBookSulFile(data);
      res.status(200).send({message: 'Book aggiornato correttamente'});
  } else {
    res.status(404).send('404 not found');
  }
};

const deleteById = async (req, res) => {
  const idBook = req.params.id;
  const data = await leggiBookDalFile();
  const indiceBookTrovato = data.books.findIndex(user => user.id === parseInt(idBook, 10));
  if (indiceBookTrovato !== -1) {
    data.books.splice(indiceBookTrovato, 1);
    await scriviBookSulFile(data);
    res.status(200).send({message: 'Book cancellato correttamente'});
  } else {
    res.status(404).send('404 not found');
  }
};


module.exports = {
  bookController: {
    findAll,
    findById,
    postById,
    updateById,
    deleteById,
  }
};