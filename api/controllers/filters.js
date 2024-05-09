const express = require('express');
const connection = require('../connection')
const stringSimilarity = require('string-similarity');
const natural = require('natural');

//this controller handles the base_url/filters request. We have to pass a json object as request body.
//This object can contain key value pairs for filtering the movies returned at result.
//The request can contain no body or a body with some of the available filters and still work just for these.
const searchMovies = (req, res) => {
    const searchText = req.body.searchText;
    const minYear = req.body.minYear;
    const maxYear = req.body.maxYear;
    const genre = req.body.genre;
    const minRuntimeMinutes = req.body.minRuntimeMinutes
    const maxRuntimeMinutes = req.body.maxRuntimeMinutes
    const titleType = req.body.titleType

    const sql_query = `SELECT * FROM title_basics`;

    connection.query(sql_query, (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if(searchText && searchText!=null ){
            // Calculate similarity scores using string-similarity library and sort the result array
            const moviesWithScores = result.map(movie => ({
                ...movie,
                similarityScore: natural.JaroWinklerDistance(searchText.toLowerCase(), movie.primaryTitle.toLowerCase()),
            }));

            result = moviesWithScores.sort((a, b) => b.similarityScore - a.similarityScore);
        }
        if(minYear && minYear!=null){
            result = result.filter(movie => movie.startYear>=minYear)
        }
        if(maxYear && maxYear!=null){
            result = result.filter(movie => movie.startYear<=maxYear)
        }
        if(genre && genre!=null){
            result = result.filter(movie => movie.genres && movie.genres.split(',').find(moviegenres => moviegenres==genre))
        }
        if(minRuntimeMinutes && minRuntimeMinutes!=null){
            result = result.filter(movie => movie.runtimeMinutes >= minRuntimeMinutes)
        }
        if(maxRuntimeMinutes && maxRuntimeMinutes!=null){
            result = result.filter(movie => movie.runtimeMinutes <= maxRuntimeMinutes)
        }
        if(titleType && titleType!=null){
            result = result.filter(movie => movie.titleType == titleType)
        }
        if (result.length==0)return res.status(204).send({message : "No films match your filters"})
        return res.status(200).send(result);
    });
}

module.exports = searchMovies
