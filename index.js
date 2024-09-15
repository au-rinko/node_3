const express = require('express');
const fs = require('fs');
const { getTop250Movies, TOP_250 } = require('./fetchData');
const { moviesArray, readAll } = require('./routes/readall');
const { read } = require('./routes/read');

const app = express();

//getTop250Movies(TOP_250);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.use('/api/films/readall', readAll);
app.use('/api/films/read', read);

app.use((req, res, next) => {
  res.status(404);
  res.send('Page not found');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});