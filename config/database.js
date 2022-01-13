const mySql = require('mysql2')
const dbConnection = mySql.createPool({
    host: "localhost",
    user: "root",
    database: "eng-spare"
}).promise()

module.exports = dbConnection