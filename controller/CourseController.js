const bodyParser = require("body-parser");
const dbConnection = require('../config/database');
var express = require('express');
var router = express.Router()

router.get('/', async (req, res) => {
    query = req.query
    console.log(query)
    params = {}
    sql = 'select F_Id as id, F_NAME as name from tbl_courses where F_STATUS = 1'
    if(query['id']) {
        sql+=' and F_ID = :id'
        params['id'] = query['id']
    }
    const row = await dbConnection.getall(sql, params)
    if(row) {
        datas = {
            status: 'success',
            message: row
         }
         // const memberToken = 
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