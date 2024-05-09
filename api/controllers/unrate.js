const express = require('express');
const connection = require('../connection')

const unlike = (req,res)=>{
    const { username, movieId } = req.params;
console.log('Im in')
    if (!username || !movieId) {
        return res.status(400).send({ error: 'username and movieId are required in the URL' });
    }

    const sql_query = `DELETE FROM like_movie
    WHERE movieId = '${movieId}' AND userID = (
        SELECT u.id
        FROM user u
        WHERE u.username = '${username}'
        LIMIT 1
    );
    `
    
    try{
        connection.query(sql_query, (err,result)=>{
            if(err) {
                //handle error without crashing
                //console.error('SQL EROOR', err)
                return res.status(500).send({ error: 'Internal Server Error' })
            }
            return res.status(200).send({success:true, action:'like_movie'});
        })
    }
    catch(error){
        //handle error without crashing
        //console.error('Unexpected Error:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

const undislike = (req,res)=>{
    const { username, movieId } = req.params;

    if (!username || !movieId) {
        return res.status(400).send({ error: 'username and movieId are required in the URL' });
    }

    const sql_query = `DELETE FROM dislike_movie
    WHERE movieId = '${movieId}' AND userID = (
        SELECT u.id
        FROM user u
        WHERE u.username = '${username}'
        LIMIT 1
    );
    `

    try{
        connection.query(sql_query, (err,result)=>{
            if(err) {
                //handle error without crashing
                //console.error('SQL EROOR', err)
                return res.status(500).send({ error: 'Internal Server Error' })
            }
            return res.status(200).send({success:true, action:'undislike_movie'});
        })
    }
    catch(error){
        //handle error without crashing
        //console.error('Unexpected Error:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = {unlike, undislike}