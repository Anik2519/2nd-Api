const mongoose = require('mongoose');
const profile = require('../routes/profile');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/2ndAPI')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/profile', profile);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));