const express = require('express');
const fs = require('fs');
let { moviesArray, readAll } = require('./readall');
const { getTop250Movies, writeToFile, TOP_250 } = require('../fetchData');
const { checkInformation, correctPosition } = require('../check');

const deleteMovie = express.Router();

deleteMovie.delete('/:id', (req, res) => {
    const { body, params: { id } } = req;

    const message = checkInformation(body, id);
    
    if (message) {
        res.status(400);
        res.send(message);
    } else {
        const subArray = moviesArray.filter(item => item.id == id);
        const index = moviesArray.indexOf(subArray[0]);
        moviesArray.splice(index, 1);
        for (let i = index; i < moviesArray.length; i++) {
            if (moviesArray[i].position !== subArray[0].position) moviesArray[i].position -= 1;
        }
    
        writeToFile(moviesArray);
    
        res.status(200);
        res.json('Movie deleted');
    }
});

module.exports = {
    deleteMovie
}