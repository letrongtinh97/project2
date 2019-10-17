const db = require('../models/db');
const moment = require('moment')
const jwt = require('jsonwebtoken');
// validate signIn
module.exports.signIn = (req,res, next)=>{
    console.log('heeh')
    const { user_username } = req.body
    const query  = `
        select user_username from tbl_profile_user where user_username =  '${user_username}'
        `
    console.log(query)
    db.postgre
        .run(query)
        .then((rs)=>{
            console.log(rs.rows.length)
            if(rs.rows.length !== 0 ){
                return res.status(200).json({
                    code: 3
                })
            }
            next();
        })
        .catch(()=>{
            return res.status(500).json({
                code: 4
            })
        })

}

//login
