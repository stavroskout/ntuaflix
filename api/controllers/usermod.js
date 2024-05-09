const express = require('express');
const connection = require('../connection');

const usermod = (req, res) => {
    const { username, password } = req.params;
    const sql_query = `INSERT INTO user (username, email, pwd) VALUES ('${username}', '${username.replace(/\s/g, '')}@gmail.com', '${password}') ON DUPLICATE KEY UPDATE pwd = '${password}'`;

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

module.exports = usermod;
