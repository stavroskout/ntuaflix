const express = require('express');
const connection = require('../connection')

const like = (req,res)=>{
    const { username, movieId } = req.params;

    if (!username || !movieId) {
        return res.status(400).send({ error: 'userId and movieId are required in the URL' });
    }

    const sql_query = `insert into like_movie (userId, movieId) 
    select u.id as userId, '${movieId} ' as movieID 
    FROM user u
    WHERE u.username = '${username} ';
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

const dislike = (req,res)=>{
    const { username, movieId } = req.params;

    if (!username || !movieId) {
        return res.status(400).send({ error: 'username and movieId are required in the URL' });
    }

    const sql_query = `insert into dislike_movie (userId, movieId) select u.id as userId, '${movieId} ' as movieID 
    FROM user u
    WHERE u.username = '${username} ';
    `

    try{
        connection.query(sql_query, (err,result)=>{
            if(err) {
                //handle error without crashing
                //console.error('SQL EROOR', err)
                return res.status(500).send({ error: 'Internal Server Error' })
            }
            return res.status(200).send({success:true, action:'dislike_movie'});
        })
    }
    catch(error){
        //handle error without crashing
        //console.error('Unexpected Error:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = {like, dislike}