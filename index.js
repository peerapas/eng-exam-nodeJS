const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require('./config/database');
const jwt = require('jwt-simple');
const app = express();
app.use(bodyParser.json());
const requireJWTAuth = require('./config/middleware/auth_middleware')
const SECRET = "ENG_EXAM_NODEJS_API";
 app.get("/", requireJWTAuth, (req, res) => {
    res.send("Hello World");
 });
//  //ทำ Middleware สำหรับขอ JWT
 const loginMiddleWare = (req, res, next) => {
    if (req.body.username === "kennaruk" 
    && req.body.password === "mak") next();
    else res.send("Wrong username and password");
 };
 app.post("/login", loginMiddleWare, (req, res) => {
    const payload = {
       sub: req.body.username,
       iat: new Date().getTime()
    };
    res.send(jwt.encode(payload, SECRET));
 });
 app.listen(3000);