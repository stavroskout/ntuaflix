const express = require('express');
const connection = require('../connection');

const searchname = async (req, res) => {
    const {namePart} = req.body.nqueryObject;

    try {
        const result = await executeQuery(`SELECT * FROM name_basics WHERE primaryName LIKE '%${namePart}%'`);

        if (result.length > 0) {
            let response = new Array(result.length)
            for (let i=0; i<result.length; i++){
            let nameID = result[i].nconst;
            const [q1, q2] = await Promise.all([
                executeQuery(`select nconst, primaryName, imageURL, birthYear, deathYear, primaryProfession from name_basics where nconst = '${nameID}'`),
                executeQuery(`select tconst, category from title_principals where nconst = '${nameID}'`)                
            ]);

            response[i] = { 
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
              
          };}

            res.status(200).send(response);
        } else {
            res.status(204).send({
                status: 204,
                message: 'Name not found'
            });
        }
    } catch (err) {
        res.status(500).send({
            status: 'Failed',
            message: err.message
        });
    }
};

const executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = searchname;
