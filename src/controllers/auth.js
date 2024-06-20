const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore durante la registrazione' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: 'Utente non trovato' });
    }


    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Password non corretta');
      return res.status(401).send({ message: 'Password non corretta' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Errore durante il login' });
  }
}

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'Nessun token fornito' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Token non valido' });
    }
    req.userId = decoded.userId;
    next();
  });
}

module.exports = { register, login, verifyToken };
