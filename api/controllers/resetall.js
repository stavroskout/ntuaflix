const connection = require('../connection');
const express = require('express');
const fs = require('fs');

const resetall = (req, res) => {
    // Get all table names from information_schema
    const getTablesQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'ntuaflix' AND table_type = 'BASE TABLE'";

    connection.query(getTablesQuery, (err, tables) => {
        if (err) {
            console.error('Error retrieving table names:', err);
            res.status(500).send({ status: 'Error', message: 'Internal Server Error' });
            return;
        }

        // Delete all records from each table
        const deletePromises = tables.map((table) => {
            const deleteQuery = `DELETE FROM ${table.table_name}`;
            return new Promise((resolve, reject) => {
                connection.query(deleteQuery, (deleteErr, result) => {
                    if (deleteErr) {
                        console.error(`Error deleting records from ${table.table_name}:`, deleteErr);
                        reject(deleteErr);
                    } else {
                        console.log(`Records deleted from ${table.table_name} successfully`);
                        resolve(result);
                    }
                });
            });
        });

        // Execute all delete queries asynchronously
        Promise.all(deletePromises)
            .then(() => {
                console.log('All records deleted successfully');
                res.status(200).send({ status: 'OK' });
            })
            .catch((error) => {
                console.error('Error deleting records:', error);
                res.status(500).send({ status: 'Error', message: 'Internal Server Error' });
            });
    });
};

module.exports = resetall;
