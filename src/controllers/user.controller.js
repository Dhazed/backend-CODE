const fs = require('fs').promises;

//FUNZIONI INTERNE, NON COLLEGATE A NESSUN ENDPOINT API
const leggiUtentiDalFile =  () => {
  return fs.readFile('database/users.json',"utf8")
    .then((resp)=>{
      const data = JSON.parse(resp)
      return data; 
    }).catch((err)=>{
      return err;
    });
};

const scriviSingoloUtenteSuFile = async (utente) => {
  try {
    await fs.writeFile('database/'+utente.nome+'_'+utente.id+'.json', JSON.stringify(utente, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Errore scrittura su singolo file!!!!!!!!!!!', error)
    return false;
  }
}

const scriviUtentiSulFile = async (data) => {
  try {
    await fs.writeFile('database/users'+'.json', JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error('Errore scrittura su file!!!!!!!!!!!', error)
    return false;
  }
};


//FUNZIONI API 
const findAll = async (req, res) => {
  const data = await leggiUtentiDalFile();
  res.status(200).json(data);
};

const findById = async (req, res) => {
  const idUtente = req.params.id;
  const data = await leggiUtentiDalFile();
  const utente = data.utenti.find(user => user.id === parseInt(idUtente, 10));
  if (utente) {
    res.status(200).json(utente);
  } else {
    res.status(404).send('404 - not found');
  }
};

const postById = async (req, res) => {
  try {
    const data = await leggiUtentiDalFile();
    const nuovoUserId = data.utenti.length + 1;
    
    const utente = req.body;
    utente.id = nuovoUserId;
    
    data.utenti.push(utente);
    
    const result = await scriviUtentiSulFile(data);
    if (result) {
      console.log('res ult : '+ result)
      const result2 = await scriviSingoloUtenteSuFile(utente);
      if (result2) {
        console.log('result2 : '+ result2)
        res.status(201).send({message: 'Utente inserito correttamente'});
      }
     
    }
    else {
      res.status(500).send({message: 'Errore inserimento utente'});
    }
   
  } catch (error) {
    console.log(error)
    res.status(500).send({message: 'Errore: ' + error});
  }
};

const updateById = async (req, res) => {
  const data = await leggiUtentiDalFile();
  const indiceUtenteTrovato = data.utenti.findIndex(user => user.id === parseInt(id, 10));
  if (indiceUtenteTrovato >= 0) {
      data.utenti[indiceUtenteTrovato] = req.body;
      await scriviUtentiSulFile(data);
      res.status(200).send({message: 'Utente aggiornato correttamente!'});
  } else {
    res.status(404).send('404 - not found');
  }
};

const deleteById = async (req, res) => {
  const idUtente = req.params.id;
  const data = await leggiUtentiDalFile();
  const indiceUtenteTrovato = data.utenti.findIndex(user => user.id === parseInt(idUtente, 10));
  if (indiceUtenteTrovato !== -1) {
    data.utenti.splice(indiceUtenteTrovato, 1);
    await scriviUtentiSulFile(data);
    res.status(200).send({message: 'Utente cancellato correttamente'});
  } else {
    res.status(404).send('404 - not found');
  }
};


module.exports = {
  userController: {
    findAll,
    findById,
    postById,
    updateById,
    deleteById,
  }
};