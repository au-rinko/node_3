const express = require('express');
const fs = require('fs');
const { moviesArray, readAll } = require('./readall');
const { checkInformation, correctPosition } = require('../check');

const read = express.Router();

read.get('/:id', (req, res) => {
    const { params: { id }} = req;
    const message = checkInformation(null, id);
    const result = moviesArray.filter(item => item.id == id);
 
    if (message) {
        res.status(400);
        res.send(message);
    } else {
        res.status(200);
        res.json(result);
    }
});

module.exports = {
    read
}