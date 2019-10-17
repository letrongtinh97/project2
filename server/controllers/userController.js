const express = require('express');

const router = express.Router();
const db = require('../models/db');
const validate = require('../middlewave/userValidate')
const pg = require('pg')
//const userController = require('../controllers/userController');
pg.defaults.ssl = true;

router.post('/get-a-user', (req, res) => {
    const { username, password } = req.body
    const query = `
        select * from tbl_profile_user u1 
        where u1.user_username = '${username}' and u1.user_password = '${password}'
    `
    db.postgre
    .run(query)
    .then((rs)=>{
        return res.status(200).json({
            code: 0,  
        })
    })
    .catch((err)=>{
        return res.status(200).json({
            code: 1,
        })
    })
});

router.get('/get-user', (req, res) => {

    const query = `
        select * from  tbl_profile_user where 
    `
    db.postgre
    .run(query)
    .then((rs)=>{
        return res.status(200).json({
            code: 0,
        })
    })
    .catch((err)=>{
        return res.status(200).json({
            code: 1,
        })
    })
});



// router.get('/db', function (req, res) {
//     const query = `SELECT * FROM tbl_profile_user`
//     db.postgre
//         .run(query)
//         .then((rs) => {

//             return res.status(200).json({

//                 code: 0,
//             })
//         })
//         .catch(() => {
//             return res.status(500).json({
//                 code: 1,
//             })
//         })

// });





module.exports = router;

