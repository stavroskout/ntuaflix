const express = require('express');
const connection = require('../connection');

const users = (req, res) => {
    const sql_query = "select * from user where username = ?";

    const { username} = req.params;

    try{
    connection.query(sql_query, [username], (err, result) => {
        if (err) throw err;
        if(result.length==0)res.status(204).json({status:204, message:"no data returned"});
        else{
        res.status(200).send(
            result
        );}
    });}
    catch(err){
        res.status(500).send({message : 'Internal Server Error'})
    }
};

module.exports = users;