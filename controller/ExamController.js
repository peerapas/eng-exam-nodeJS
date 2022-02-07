const bodyParser = require("body-parser");
const dbConnection = require('../config/database');
var express = require('express');
var router = express.Router()

router.get('/', async (req, res) => {
    query = req.query
    sql = "select F_ID as id, F_COURSE_ID as courseId, F_EXAM_DATE as examDate, F_DESIGN_DATE as designDate, F_REVIEW_DATE as reviewDate, F_SET_AMOUNT as setAmount, F_EXAM_AMOUNT as examAmount, F_CR_BY as crBy from tbl_exams where F_STATUS = 1";
    params = {}
    if(query['id']) {
        sql+= ' and F_ID = :id'
        params['id'] = query['id']
    }
    if(query['courseId']) {
        sql+= ' and F_COURSE_ID = :courseId'
        params['courseId'] = query['courseId']
    }
    const row = await dbConnection.getall(sql, params)
    if(row) {
        datas = {
            status: 'success',
            message: row
         }
         res.send(datas)
    } else {
        datas = {
            status: 'success',
            message: []
        }
        res.send(datas)
    }
})

module.exports = router