const express = require('express');
const connection = require('../connection');

const dislikedmovies = async (req, res) => {
    // Retrieve userid from URL parameters
    const { userid } = req.params;

    const result = `SELECT * FROM dislike_movie WHERE userID = '${userid}'`;

    connection.query(result, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send({ status: 'Error', message: 'Internal Server Error' });
            return;
        }
        res.send(result);
    });
}

module.exports = dislikedmovies;
