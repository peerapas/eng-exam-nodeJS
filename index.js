const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require('./config/database');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt')
const app = express();
app.use(bodyParser.json());
const requireJWTAuth = require('./config/middleware/auth_middleware')
const SECRET = "ENG_EXAM_NODEJS_API";
 app.get("/", requireJWTAuth, (req, res) => {
    res.send("Hello World");
 });
 app.post("/login", async (req, res) => {
   let username = req.body.username
   let password = req.body.password
   const row = await dbConnection.getrow('SELECT F_USERNAME as username, F_PASSWORD as password FROM tbl_members WHERE F_USERNAME = :username AND F_STATUS = 1', {username: username})
   if(row) {
      const same = await bcrypt.compare(password, row.password)
      if(same == true) {
         const member = await dbConnection.getrow('SELECT F_ID as memberId, F_USERNAME as username, F_FIRST_NAME as firstName, F_LAST_NAME as lastName FROM tbl_members WHERE F_USERNAME = :username AND F_STATUS = 1', {username: username})
         // console.log(typeof(member));
         const payload = {
            sub: member,
            iat: new Date().getTime()
         }
         const token = jwt.encode(payload, SECRET)
         let resultArr = Object.entries(member);
         resultArr.push(['token', token])
         let result = Object.fromEntries(resultArr);
         datas = {
            status: 'success',
            message: result
         }
         // const memberToken = 
         res.send(datas)
      } else {
         datas = {
            status: 'fail',
            message: 'invalid password'
         }
         res.send(datas);
      }
   } else {
      datas = {
         status: 'fail',
         message: 'invalid username'
      }
      res.send(datas);
   }
 });
 app.listen(3000);