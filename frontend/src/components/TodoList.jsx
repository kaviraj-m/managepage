import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/todoList')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the To-Do List data!', error);
      });
  }, []);

  return <div>{data || 'Loading To-Do List data...'}</div>;
};

export default TodoList;
