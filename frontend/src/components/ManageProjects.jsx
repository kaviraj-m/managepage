import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    axios.get('/api/projects')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.error('Expected an array of projects, but received:', response.data);
        }
      });
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectedProjects.includes(id)) {
      setSelectedProjects(selectedProjects.filter((projectId) => projectId !== id));
    } else {
      setSelectedProjects([...selectedProjects, id]);
    }
  };

  const handleAction = (action) => {
    axios.post('/api/projects/updateStatus', { ids: selectedProjects, action })
      .then(() => {
        axios.get('/api/projects').then((response) => {
          if (Array.isArray(response.data)) {
            setProjects(response.data);
          } else {
            console.error('Expected an array of projects, but received:', response.data);
          }
        });
      });
  };

  return (
    <div>
      <h2>Manage Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedProjects.includes(project.id)}
                onChange={() => handleCheckboxChange(project.id)}
              />
              {project.name} - {project.isActive ? 'Active' : 'Hidden'}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAction('install')}>Activate</button>
      <button onClick={() => handleAction('hide')}>Deactivate</button>
    </div>
  );
};

export default ManageProjects;
