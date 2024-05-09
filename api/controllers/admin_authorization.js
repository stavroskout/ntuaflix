const express = require('express');
const connection = require('../connection');


const admin_auth = function (req, res, next) {
    const admin_titleCookie = req.cookies.admin_cookie;
    const titleCookie = req.cookies.user_cookie;
    const user = titleCookie ? titleCookie.split('_token')[0] : ''

    if (user==''){return res.status(401).send('Not authorized');}
    const sql_query = "select * from user where username = ?";
    connection.query(sql_query, [user], (err, result) => {
      if (err)  { return res.status(500).send({message : "Internal Server Error"})}
      if(result.length==0)return res.status(401).send('Not authorized');
      else{
        if (admin_titleCookie && admin_titleCookie === 'daddyroumi'){next();}
        else {
          return res.status(401).send('Not authorized');
        }
      }
    })
  };

module.exports = admin_auth