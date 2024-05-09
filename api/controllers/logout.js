const express = require('express');
const connection = require('../connection')

const logout = (req,res)=>{
    res.clearCookie('user_cookie')
    res.clearCookie('admin_cookie')
    res.status(200).send({message : "User logged out"})
}

module.exports = logout