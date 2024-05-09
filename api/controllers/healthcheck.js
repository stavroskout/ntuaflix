const connection = require('../connection')
const express = require('express');

const healthcheck = (req,res)=>{
    const host = connection.config.host
    const database = connection.config.database
    const user = connection.config.user
    const password = connection.config.password
    connection.connect((err)=>{
        if(err){
            res.status(500).send({
                status: 'failed',
                dataconnection: "[database:'ntuaflix', password:'']"
            })
        }else{res.send({
            status: 'OK',
            dataconnection: "[database:'ntuaflix', password:'']"
        })}
    })
}

module.exports = healthcheck