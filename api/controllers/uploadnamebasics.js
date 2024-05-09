const express = require('express');
const multer = require('multer');
const fs = require('fs');
const uploadRouter = express.Router();
const connection = require('../connection')


const uploadFolder = './uploads';
const upload = multer({ dest: uploadFolder });

const uploadnamebasics = (req, res) =>{
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).send({
                status: 'failed',
                message: 'Error uploading file',
                error: err.message,
            });
        }
        const data = fs.readFileSync(`./${req.file.path}`, 'utf-8');
        const rows = data.replace(/\r/g, '').split('\n');
        rows.forEach((row)=>{
            if (row.trim() === '') {
                return;
            }
            let values = row.split('\t')
            if(values.length!=7){
                fs.unlink(`./${req.file.path}`, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
                return res.status(400).send({
                    status: `Failed`,
                    message:` Stopped at ${values}`,
                    error: `Row had ${values.length} values but query needed 7`
            })}
            let sql_query = `insert into name_basics (nconst, primaryName, birthYear, deathYear, primaryProfession, knownForTitles, imageURL) values('${values[0]}', '${values[1]}', ${values[2]}, ${values[3]}, '${values[4]}', '${values[5]}', '${values[6]}')`
            connection.query(sql_query, (err,result)=>{
                if(err) {
                    return res.status(500).send({
                        status: 'failed',
                        message: 'Error uploading file',
                        error: err.message,
                    });
                }
                res.status(200).send({
                    status: 'OK',
                    message: 'File loaded successfully'
                });
            })
            fs.unlink(`./${req.file.path}`, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        })
    })
}

module.exports = uploadnamebasics;