const express = require('express');
const fs = require('fs');
const path = require('path');

const jsonData = fs.readFileSync(path.join(__dirname, '../movies.json'), 'utf8');
let moviesArray = JSON.parse(jsonData);

const readAll = express.Router();

readAll.get('/', (req, res) => {
    res.json(moviesArray);
});

module.exports = {
    moviesArray,
    readAll
}