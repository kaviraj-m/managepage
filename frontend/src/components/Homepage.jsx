import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Button, Card, CardContent, CardActions, AppBar, Toolbar } from '@mui/material';

const HomePage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProjects(res.data);
        } else {
          console.error('Expected an array of projects, but received:', res.data);
        }
      })
      .catch((err) => console.error('Error fetching projects:', err));
  }, []);

  return (
    <Box 
      minHeight="100vh" 
      display="flex" 
      flexDirection="column" 
      bgcolor="#e0f7e9" // Mild green background
      color="#333"
    >
      {/* AppBar Header */}
      <AppBar position="static" sx={{ bgcolor: '#004d40', padding: '10px' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ color: '#fff', flexGrow: 1 }}>
            Projects
          </Typography>
          <Button
            component={Link}
            to="/manage-projects"
            variant="contained"
            sx={{
              backgroundColor: '#004d40', 
              color: '#fff',
              '&:hover': { backgroundColor: '#00332e' }
            }}
          >
            Manage Projects
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" flex="1" p={3}>
        <Grid container spacing={3}>
          {projects
            .filter(project => project.isActive) // Ensure only active projects are shown
            .map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#ffffff',
                    transition: 'transform 0.2s, box-shadow 0.3s',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'scale(1.03)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ color: '#004d40' }}>
                      {project.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={`/${project.path}`}
                      size="small"
                      variant="contained"
                      sx={{ backgroundColor: '#004d40', color: '#fff', '&:hover': { backgroundColor: '#00332e' } }}
                    >
                      Go to {project.name}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
