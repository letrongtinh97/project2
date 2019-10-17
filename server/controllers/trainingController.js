const express = require('express');
const router = express.Router();
const db = require('../models/db')
const userController = require('../controllers/userController')

router.get('/all-course', (req, res) => {
    const query = `
        SELECT * FROM tbl_master_course
    `
    db.postgre
        .run(query)
        .then((rs) => {
            return res.status(200).json({
                code: 0,
                data: rs.rows,
            })
        })
        .catch((err) => ({
            code: 1,
        })
        )
})

module.exports = router;