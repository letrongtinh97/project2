

const config = require('../models/config')

const jwt = require('jsonwebtoken');

const db = require('../models/db')
const isAuthenticated = (req, res, next) => {
    if (typeof req.headers.authorization !== 'undefined') {
        let token = req.headers.authorization.split(" ")[1];
        let privateKey = config.secret;
        jwt.verify(token, privateKey, {
            algorithm: 'HS256',
            expiresIn: config.tokenLife,
        }, (err, decoded) => {
            if (err) {
                res.status(400).json({ code: 1 })
            }
            const query = ` select * from tbl_profile_user where user_username = '${decoded.user.username}' and  user_password = '${decoded.user.password}'`
            db.postgre
                .run(query)
                .then((rs) => {
                    if (rs.rows.length === 0) {
                        return res.status(500).json({
                            code: 3
                        })
                    }
                    return next();
                })
                .catch((err) => {
                    return res.status(500).json({
                        code: 4
                    })
                })
        })
    }
    else {
        res.status(500).json({
            code: 2
        })
    }
}


module.exports = {
    isAuthenticated
}