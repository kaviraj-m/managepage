import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Calculator = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/calculator')
      .then(response => {
        setData(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the Calculator data!', error);
      });
  }, []);

  return <div>{data || 'Loading Calculator data...'}</div>;
};

export default Calculator;
