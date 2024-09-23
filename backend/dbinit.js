const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./config/database'); // Adjust the path if needed
const Project = require('./models/project')(sequelize, DataTypes); // Adjust the path if needed


const projects = [
  { id: 1, name: 'Calculator', path: 'calculator', isActive: true },
  { id: 2, name: 'Notes', path: 'notes', isActive: true },
  { id: 3, name: 'Todo List', path: 'todolist', isActive: true }
];


const insertProjects = async () => {
  try {
    await sequelize.sync();
    await Project.bulkCreate(projects, { updateOnDuplicate: ['name', 'path', 'isActive'] });
    console.log('Projects inserted successfully');
  } catch (error) {
    console.error('Error inserting projects:', error);
  } finally {
    await sequelize.close(); 
  }
};


insertProjects();
