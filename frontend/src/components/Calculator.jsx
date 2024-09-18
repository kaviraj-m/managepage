import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Paper, List, ListItem, Divider } from '@mui/material';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/calculator')
      .then(res => setCalculations(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const evalResult = eval(expression); // Evaluate expression (simple example)
      axios.post('http://localhost:5000/api/calculator', { expression, result: evalResult })
        .then(() => {
          setCalculations([...calculations, { expression, result: evalResult }]);
          setExpression('');
          setResult(evalResult);
        })
        .catch(err => console.error(err));
    } catch (error) {
      console.error('Invalid expression');
    }
  };

  return (
    <Box sx={{ bgcolor: '#e0f7e9', minHeight: '100vh', p: 4 }}>
      {/* Page Header */}
      <Typography variant="h4" sx={{ mb: 4, color: '#004d40', fontWeight: 'bold', textAlign: 'center' }}>
        Calculator
      </Typography>

      {/* Calculator Form */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: '#ffffff', maxWidth: '600px', width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="Enter expression"
              sx={{ mb: 2 }}
              InputProps={{
                style: { fontSize: '1.2rem', padding: '10px' }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#004d40',
                color: '#fff',
                '&:hover': { backgroundColor: '#00332e' },
                width: '100%',
                padding: '12px',
                fontSize: '1rem'
              }}
            >
              Calculate
            </Button>
          </form>
          {result && (
            <Typography variant="h6" sx={{ mt: 2, color: '#004d40', fontWeight: 'bold', textAlign: 'center' }}>
              Result: {result}
            </Typography>
          )}
        </Paper>
      </Box>

      {/* History */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ maxWidth: '600px', width: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#004d40', fontWeight: 'bold' }}>
            History
          </Typography>
          <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2, bgcolor: '#ffffff' }}>
            <List>
              {calculations.map((calc, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ color: '#004d40', fontSize: '1rem', padding: '8px 16px' }}>
                    {calc.expression} = <Typography component="span" sx={{ fontWeight: 'bold' }}>{calc.result}</Typography>
                  </ListItem>
                  {index < calculations.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Calculator;
