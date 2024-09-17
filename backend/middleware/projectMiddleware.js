const Project = require('../models/Project');

const projectMiddleware = (projectName) => {
  return async (req, res, next) => {
    const project = await Project.findOne({ where: { name: projectName } });

    if (project && project.isActive) {
      next();
    } else {
      res.status(404).json({ message: `${projectName} not found or inactive.` });
    }
  };
};

module.exports = projectMiddleware;
