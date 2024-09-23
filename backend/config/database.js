const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('meow', 'root', 'meow', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true
});

module.exports = sequelize;
