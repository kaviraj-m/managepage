import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notes = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/notes')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the Notes data!', error);
      });
  }, []);

  return <div>{data || 'Loading Notes data...'}</div>;
};

export default Notes;
