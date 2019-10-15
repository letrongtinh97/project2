const db = require('../models/db');
const moment = require('moment')

// validate signIn
module.exports.signIn = (req,res, next)=>{
    console.log('heeh')
    const { user_username } = req.body
    const query  = `
        select user_username from tbl_profile_user where user_username =  ${user_username}
        `
        
    db.postgre
        .run(query)
        .then((rs)=>{
            console.log(rs.rows.length)
            if(rs.rows.length !== 0 ){
                return res.status(200).json({
                    code: 3
                })
            }
            next()
        })
        .catch(()=>{
            return res.status(500).json({
                code: 4
            })
        })

}
const premissonUser = (user) =>{
    
}
//login
module.exports.loginValidate =  (req,res, next)=>{
    const {username, password} = req.body
    if(!username || !password){
        return res.status(500).json({
            code: 2
        })
    }

    next()
}