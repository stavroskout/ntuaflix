const express = require('express')
const connection = require('../connection')

const bynameID = (req, res)=>{
    const nameID = req.params.nameID
    let response = {}

    const executeQuery = (query) =>{
        return new Promise((resolve, reject) => {
            connection.query(query, (err, res) => {
                if(err) reject(err)
                else{resolve(res)}
            })
        })
    }

    const first_query = `select nconst, primaryName, imageURL, birthYear, deathYear, primaryProfession from name_basics where nconst = '${nameID}'`
    const second_query = `select tconst, category from title_principals where nconst = '${nameID}'`
    
    Promise.all([executeQuery(first_query), executeQuery(second_query)])
        .then(([q1, q2]) => {
            if(q1.length==0) {res.status(204).send({status:204, message:"no data to return"});}
            else{
            response = { 
                nameID:q1[0].nconst,
                name: q1[0].primaryName,
                namePoster: q1[0].imageURL,
                birthYr: q1[0].birthYear,
                deathYr: q1[0].deathYr ? q1[0].deathYr : null,
                profession: q1[0].primaryProfession,
                nameTitles: q2.map((object) => ({
                  titleID: object.tconst,
                  category: object.category
              }))
                
            }
            res.status(200).send(response)}
        })
        .catch((err) => {
            res.status(500).send({
                status: 'Failed',
                message: err.message
            }
            )}
        )
}

module.exports = bynameID