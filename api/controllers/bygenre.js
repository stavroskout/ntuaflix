const express = require('express');
const connection = require('../connection');

const bygenre = async (req, res) => {
    const { qgenre, minrating, yrFrom, yrTo } = req.body.gqueryObject;

    try {
        let query = `SELECT tb.* 
                     FROM title_basics tb
                     JOIN title_ratings tr ON tb.tconst = tr.tconst
                     WHERE tb.genres LIKE '%${qgenre}%' 
                     AND tr.averageRating >= ${minrating}`;

        if (yrFrom && yrTo) {
            query += ` AND tb.startYear >= ${yrFrom} AND tb.startYear <= ${yrTo}`;
        }

        const result = await executeQuery(query);

        if (result.length > 0) {
            let response = new Array(result.length)
            for (let i=0; i<result.length; i++){
            let titleID = result[i].tconst;
            const [q1, q2, q3, q4] = await Promise.all([
                executeQuery(`SELECT * FROM title_basics WHERE tconst = '${titleID}'`),
                executeQuery(`SELECT * FROM title_akas WHERE titleId = '${titleID}'`),
                executeQuery(`SELECT n.nconst, n.primaryName, p.category FROM title_principals p JOIN name_basics n ON p.nconst = n.nconst WHERE p.tconst = '${titleID}'`),
                executeQuery(`SELECT * FROM title_ratings WHERE tconst='${titleID}'`),
            ]);

            response[i] = {
                titleID: q1[0].tconst,
                type: q1[0].titleType,
                originalTitle: q1[0].originalTitle,
                titlePoster: q1[0].imageURL,
                startYear: q1[0].startYear,
                endYear: q1[0].endYear,
                genres: q1[0].genres ? q1[0].genres.split(',').map((genre) => ({ genreTitle: genre })) : null,
                titleAkas: q2.map((object) => ({ akaTitle: object.title, regionAbbrev: object.region })),
                principals: q3.map((object) => ({ nameID: object.nconst, name: object.primaryName, category: object.category })),
                rating: q4[0] ? { avRating: q4[0].averageRating, nVotes: q4[0].numVotes } : null
            };
        }

            res.status(200).send(response);
        } else {
            res.status(204).send({
                status: 204,
                message: 'No titles found for the specified criteria'
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

module.exports = bygenre;
