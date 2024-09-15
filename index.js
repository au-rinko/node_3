const express = require('express');
const fs = require('fs');
const { getTop250Movies, TOP_250 } = require('./fetchData');

const app = express();

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});