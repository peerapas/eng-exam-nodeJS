const DB = require('mysql2-async').default
const dbConnection = new DB({
    host: "localhost",
    user: "root",
    password: "",
    timezone: "Asia/Bangkok",
    skiptzfix: true,
    database: "eng-spare"
})
module.exports = dbConnection