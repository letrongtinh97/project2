const express = require('express');

const router = express.Router();
const db = require('../models/db');
const validate = require('../middlewave/userValidate')
const pg = require('pg')
//const userController = require('../controllers/userController');
pg.defaults.ssl = true;
const pool = new pg.Pool(db.config);
router.post('/get-a-user',(req,res)=>{
    const { username, password } = req.body
    const query = `
        select * from tbl_profile_user u1 
        where u1.user_username = '${username}' and u1.user_password = '${password}'
    `
    pool.connect(function (err, client, done) {
        client.query(query, function (err, result) {
            done();
            if (err) {
                return res.status(500).json({
                    code: 1,
                })
            }
            else {
                return res.status(200).json({
                    code: 0,
                    data: result.rows[0],
                })
            }
        });
    });
});

router.get('/get-user',  (req, res) => {
    
    const query = `
        select * from  tbl_profile_user where 
    `
    pool.connect(function (err, client, done) {
        client.query(query, function (err, result) {
            done();
            if (err) {
                return res.status(500).json({
                    code: 1,
                })
            }
            else {
                return res.status(200).json({
                    code: 0,
                    data: result.rows,
                })
            }
        });
    });
});

router.post('/signin',(req, res) => {
    const { user_name, user_cmnd, user_phone, user_address, user_mail, user_password, user_username } = req.body
    const query = `
        INSERT INTO tbl_profile_user(
                                            user_name, 
                                            user_cmnd, 
                                            user_phone, 
                                            user_address, 
                                            user_mail, 
                                            user_password,
                                            user_username
                                           
                                            )
                                    VALUES (
                                            '${user_name ? user_name : null}',
                                            '${user_cmnd}',
                                            '${user_phone ? user_phone : null}',
                                            '${user_address ? user_address : null}',
                                            '${user_mail ? user_mail : null}',
                                            '${user_password}',
                                            '${user_username}'
                                           
                                    ) ;
                                    `
    pool.connect(function (err, client, done) {
        client.query(query, function (err, result) {
            done();
            if (err) {
                return res.status(500).json({
                    code: 1,
                })
            }
            else {
                return res.status(200).json({
                    code: 0,
                })
            }
        });
    });
})
// router.get('/db', function (req, res) {

//     pool.connect(function (err, client, done) {
//         client.query('SELECT * FROM tbl_profile_user', function (err, result) {
//             done();
//             if (err) {
//                 return res.status(500).json({
//                     code: 1,
//                 })
//             }
//             else {
//                 return res.status(200).json({
//                     code: 0,
//                     data: result.rows,
//                 })
//             }
//         });
//     });
// });
router.post('/login', validate.loginValidate, (req, res) => {

    const { username, password } = req.body
    const query = `
            select u2.permission_name from tbl_permission_user u1
            left join tbl_profile_user u2
            on  u1.user_cmnd = u2.user_cmnd

            where u1.user_username = '${username}' and u1.user_password = '${password}'
    `
    //const query = 'SELECT * FROM tbl_permission_user  '

    pool.connect(function (err, client, done) {
        client.query(query, function (err, result) {
            done();
            if (err) {
                return res.status(500).json({
                    code: 1,
                })
            }
            else {
                return res.status(200).json({
                    code: 0,
                    data: result.rows,
                })
            }
        });
    });
})



module.exports = router;

