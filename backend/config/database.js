const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db', 'root', 'MEOW', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
