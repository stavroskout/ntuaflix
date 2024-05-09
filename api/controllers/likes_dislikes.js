const express = require('express');
const connection = require('../connection')

const likes = (req,res)=>{
    const { user } = req.params;

    if (!user) {
        return res.status(400).send({ error: 'user is required in the URL' });
    }

    const sql_query = `select * from title_basics join like_movie on movieId = tconst where userId = (select id from user where username='${user}')`
    
    try{
        connection.query(sql_query, (err,result)=>{
            if(err) {
                //handle error without crashing
                console.error('SQL EROOR', err)
                return res.status(500).send({ error: 'Internal Server Error' })
            }
            return res.status(200).send(result);
        })
    }
    catch(error){
        //handle error without crashing
        //console.error('Unexpected Error:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

const dislikes = (req,res)=>{
    const { user } = req.params;

    if (!user) {
        return res.status(400).send({ error: 'user is required in the URL' });
    }

    const sql_query = `select * from title_basics join dislike_movie on movieId = tconst where userId = (select id from user where username='${user}')`

    try{
        connection.query(sql_query, (err,result)=>{
            if(err) {
                //handle error without crashing
                //console.error('SQL EROOR', err)
                return res.status(500).send({ error: 'Internal Server Error' })
            }
            return res.status(200).send(result);
        })
    }
    catch(error){
        //handle error without crashing
        //console.error('Unexpected Error:', error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = {likes, dislikes}