import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ManageProjects from './components/ManageProjects';
import Calculator from './components/Calculator';
import Notes from './components/Notes';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/manage-projects" element={<ManageProjects />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/todo-list" element={<TodoList />} />
      </Routes>
    </Router>
  );
};

export default App;
