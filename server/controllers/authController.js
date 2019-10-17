const express = require('express');

const jwt = require('jsonwebtoken');
const router = express.Router();

const db = require('../models/db')
const config = require('../models/config');

const validate = require('../middlewave/userValidate')


router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(500).json({
      code: 2
    })
  }
  const query = `
          select u1.permission_code, u2.user_cmnd, u2.user_username, u2.user_password from tbl_permission_user u1
          left join tbl_profile_user u2
          on  u1.user_cmnd = u2.user_cmnd

          where u2.user_username = '${username}' and u2.user_password = '${password}'
  `


  db.postgre
    .run(query)
    .then((rs) => {
      console.log(rs.rows[0].user_username)
      let username = rs.rows[0].user_username
      let password = rs.rows[0].user_password
      let jwtKey = config.secret
      const user = {
        username,
        password
      }
      const token = jwt.sign({ user }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: config.tokenLife,
      })
      res.status(200).json({
        code: 0,
        data: rs.rows,
        token: token,
      })
      res.end()
    })
    .catch((err) => {
      return res.status(200).json({
        code: 1,
      })
    })
  
});

router.post('/signin',validate.signIn, (req, res) => {
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
                                          '${user_name ? user_name : ''}',
                                          '${user_cmnd }',
                                          '${user_phone ? user_phone : ''}',
                                          '${user_address ? user_address : ''}',
                                          '${user_mail ? user_mail : ''}',
                                          '${user_password ? user_password: ''}',
                                          '${user_username ? user_username: ''}'
                                         
                                  ) ;
                                  `
  
  db.postgre
      .run(query)
      .then((rs) => {
          return res.status(200).json({
              code: 0,
          })
      })
      .catch((err) => {
          return res.status(200).json({
              code: 1,
          })
      })
});


module.exports = router;