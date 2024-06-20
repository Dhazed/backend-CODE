const { User } = require('../../models/index');

async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore nel recuperare gli utenti dal database' });
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: 'Utente non trovato' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore nel recuperare l\'utente dal database' });
  }
}

async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore durante la creazione dell\'utente nel database' });
  }
}

async function updateUserById(req, res) {
  try {
    const userId = req.params.id;
    const updatedUser = await User.update(req.body, { where: { id: userId } });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore nell\'aggiornare l\'utente nel database' });
  }
}

async function deleteUserById(req, res) {
  try {
    const userId = req.params.id;
    await User.destroy({ where: { id: userId } });
    res.status(200).send({ message: 'Utente cancellato correttamente' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore nella cancellazione dell\'utente nel database' });
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};

