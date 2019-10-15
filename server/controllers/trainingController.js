const express = require('express');
const router = express.Router();
const db = require('../models/db')
const userController = require('../controllers/userController')

router.get('/get-data1',(req,res)=>{
    res.send('get-data1')
});

router.post('/ter',(req,res)=>{
    res.send('get-data1')
});


module.exports = router;