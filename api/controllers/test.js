const express = require('express');
const connection = require('../connection')

const test = (req,res)=>{
    res.status(200).send({message : 'user authorization'})
}

module.exports = test