const express = require('express');
const {like, dislike} = require('../controllers/rate')
const {unlike, undislike} = require('../controllers/unrate')
const searchMovies = require('../controllers/filters')
const bytitleID = require('../controllers/bytitleID')
const searchTitle = require('../controllers/searchtitle')
const bygenre = require('../controllers/bygenre')
const bynameID = require('../controllers/bynameID')
const searchname = require('../controllers/searchname')
const logout = require('../controllers/logout');
const test = require('../controllers/test');
const {likes, dislikes} = require('../controllers/likes_dislikes')
const genres= require('../controllers/genres')
router = express.Router()

router.post('/logout', logout)
router.post('/rate/like/:username/:movieId', like)
router.post('/unrate/unlike/:username/:movieId', unlike)

router.post('/rate/dislike/:username/:movieId', dislike)
router.post('/unrate/undislike/:username/:movieId', undislike)

router.post('/filters', searchMovies)
router.get('/title/:titleID', bytitleID)
router.get('/searchtitle', searchTitle)
router.get('/bygenre', bygenre)
router.get('/name/:nameID', bynameID)
router.get('/searchname', searchname)
router.get('/test', test)
router.get('/likes/:user', likes)
router.get('/dislikes/:user', dislikes)
router.get('/genres', genres)
module.exports = router
