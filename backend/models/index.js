const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance


const Project = require('./project')(sequelize, DataTypes);
const Calculator = require('./calculator')(sequelize, DataTypes);
const Note = require('./note')(sequelize, DataTypes);
const TodoList = require('./todolist')(sequelize, DataTypes);

module.exports = { Project, Calculator, Note, TodoList };
