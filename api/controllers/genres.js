const express = require('express');
const connection = require('../connection');

const genres = async (req, res) => {

    const result = `SELECT DISTINCT TRIM(both ' ' FROM SUBSTRING_INDEX(SUBSTRING_INDEX(genres, ',', n), ',', -1)) as genre
    FROM title_basics
    JOIN (
      SELECT n FROM (
        SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
      ) numbers
    ) numbers
    ON CHAR_LENGTH(genres) - CHAR_LENGTH(REPLACE(genres, ',', '')) >= n - 1
    WHERE genres IS NOT NULL;
    `;

    connection.query(result, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send({ status: 'Error', message: 'Internal Server Error' });
            return;
        }
        res.send(result);
    });
}

module.exports = genres;
