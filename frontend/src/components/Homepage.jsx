import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calculator from './Calculator';
import Notes from './Notes';
import TodoList from './TodoList';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [activeComponents, setActiveComponents] = useState({});

  useEffect(() => {
    axios.get('/api/projects')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProjects(res.data);
          const activeProjects = res.data.filter(project => project.isActive);
          const activeComponents = {};
          activeProjects.forEach(project => {
            switch (project.path) {
              case 'calculator':
                activeComponents.Calculator = <Calculator key="calculator" />;
                break;
              case 'notes':
                activeComponents.Notes = <Notes key="notes" />;
                break;
              case 'todolist':
                activeComponents.TodoList = <TodoList key="todolist" />;
                break;
              default:
                break;
            }
          });
          setActiveComponents(activeComponents);
        } else {
          console.error('Expected an array of projects, but received:', res.data);
        }
      })
      .catch((err) => console.error('Error fetching projects:', err));
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <div>
        {Object.values(activeComponents)}
      </div>
    </div>
  );
};

export default HomePage;
