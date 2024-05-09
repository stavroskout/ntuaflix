const express = require('express');
const connection = require('../connection');

const insertuser = (req, res) => {
    const { username, email, pwd } = req.params;
    const sql_query = `INSERT INTO user (username, email, pwd, isadmin) VALUES ('${username}', '${email}', '${pwd}', 0) ON DUPLICATE KEY UPDATE pwd = '${pwd}'`;
    try{
        connection.query(sql_query, (err, result) => {
            if (err) throw err;
            res.status(200).send({
                status: 'OK',
                message: 'User inserted/updated successfully'
            }
            );
        });}
    catch(err){
        res.status(500).send({message : 'Internal Server Error'})
    }
};

module.exports = insertuser;