require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectModule: require('mysql2')
});


const Book = require('./modelsBook')(sequelize, DataTypes);
const User = require('./modelsUsers')(sequelize, DataTypes);

const db = {
  sequelize,
  Book,
  User
};


sequelize.sync({ alter: true, force: false }) 
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

module.exports = db;
