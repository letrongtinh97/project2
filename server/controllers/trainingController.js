const express = require('express');
const router = express.Router();
const db = require('../models/db')
const userController = require('../controllers/userController')
const moment = require('moment')
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
});

router.post('/insert-course',(req,res) =>{
    const  { mcourse_name,mcourse_content,mcourse_pre,mcourse_date,mcourse_salary } = req.body
    //if(mcourse_date)
    const date = mcourse_date
    const query = `
                INSERT INTO tbl_master_course(
                                                mcourse_name,
                                                mcourse_content,
                                                mcourse_pre,
                                                mcourse_date,
                                                mcourse_salary
                                            )
                                            values
                                            (
                                                '${mcourse_name ? mcourse_name : null}',
                                                '${mcourse_content ? mcourse_content : null}',
                                                '${mcourse_pre ? mcourse_pre : null}',
                                                '${date ? date : ""}',
                                                '${mcourse_salary ? mcourse_salary : null}'
                                            )
                                            RETURNING;
    `
    console.log(query)
    db.postgre
            .run(query)
            .then((rs)=>{
                    if(rs.rows.lenght === 0){
                        return res.status(500).json({
                            code: 3
                        })
                    }
                    return res.status(200).json({
                        code: 0
                    })
            })
            .catch((err)=>{
                        return res.status(500).json({
                            code: 1
                        })
            })
});
module.exports = router;