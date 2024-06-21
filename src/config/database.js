const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://root:Chilless19.@localhost:3306/primo_database'); //configurare database

module.exports = sequelize;