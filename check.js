const express = require('express');
const fs = require('fs');
const { moviesArray, readAll } = require('./routes/readall');

function checkInformation (body, id) {
    let message = null;
    
    if (+body.year < 1895) {
        message = 'Year is incorrect';
    }

    if (parseInt(body.budget) < 0 || parseInt(body.gross) < 0 || body.position < 0) {
        message = 'Numbers cannot be negative';
    }

    if (!id) {
        message = 'Enter the correct id';
    }

    if (id !== 'no needed') {
        const result = moviesArray.filter(item => item.id == id);
        if (result.length === 0) {
            message = 'There is no movie with such id';
        }
    }

    return message;
}

function correctPosition(body, newMovie) {
    let flag = true;
    let subArray = [];
    while (flag) {
        subArray = moviesArray.filter(item => item.position === body.position);
        if (subArray.length > 0 || body.position < 0) {
            flag = false;
        } else {
            body.position--;
        }
    }
    
    if (subArray.length > 0) {
        const index = moviesArray.indexOf(subArray[0]);
        moviesArray.splice(index, 0, newMovie);
        moviesArray[index].position = body.position;
        for (let i = index + 1; i < moviesArray.length; i++) {
            if (moviesArray[i].position !== body.position) moviesArray[i].position += 1;
        }
    } else {
        moviesArray.push(newMovie);
    }
}

module.exports = {
    checkInformation,
    correctPosition
}