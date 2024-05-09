const express = require('express');
const connection = require('../connection')

const login = (req,res)=>{
    const {username, email, pwd} = req.params

    const sql_query = `select * from user where email='${email}'`
    connection.query(sql_query, (err,result)=>{
        if(err) {
            res.status(500).send({
                status: 'failed',
                dataconnection: "[database:'ntuaflix', password:'']"
            })
        }
        if(!result[0] || result[0].username!=username || result[0].pwd!=pwd){
            res.status(400).send({message : 'Not Authorized'})
        }
        else{
            res.cookie('user_cookie', `${username}_token`, {maxAge: 30*60*1000, sameSite: 'None', secure: true})
            if(result[0].isadmin==1){
               res.cookie('admin_cookie', "daddyroumi", {maxAge: 30*60*1000, sameSite: 'None', secure: true})
                //res.send("User and admin cookies given")
                res.status(200).send({"user_cookie" : `${username}_token`, "admin_cookie" : "daddyroumi"})
            }else{res.status(200).send({"user_cookie" : `${username}_token`})}
        }
    })
}

module.exports = login
