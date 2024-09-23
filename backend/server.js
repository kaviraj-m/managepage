const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api'); // Import API routes
const sequelize = require('./config/database'); // Import Sequelize instance
 
const app = express();


app.use(cors());

app.use(bodyParser.json());


app.use('', apiRoutes);


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
