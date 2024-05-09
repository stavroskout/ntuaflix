const express = require('express');
const connection = require('../connection');
//checks if the user with user_token is into the database
const user_auth = function (req, res, next) {
    const titleCookie = req.cookies.user_cookie;
    const user = titleCookie ? titleCookie.split('_token')[0] : ''
    if (user==''){return res.status(401).send({message: 'Not authorized', 'user_cookie': user});}
    const sql_query = `select * from user where username = '${user}'`;
    
    connection.query(sql_query, (err, result) => {
      if (err) { return res.status(500).send({message : "Internal Server Error"})}
      if(result.length==0) return res.status(401).send({message: 'Not authorized', 'user_cookie': user});
      else{
        next();
      }
    })
};

module.exports = user_auth