const express = require('express');
const connection = require('../connection')

const mainpage = (req,res)=>{
    const sql_query = "select * from title_basics"
    connection.query(sql_query, (err,result)=>{
        if(err) throw err;
        res.send(result);
    })
}

module.exports = mainpage