const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var authenController = require('./controller/AuthenController')


app.use(bodyParser.json());
const requireJWTAuth = require('./config/middleware/auth_middleware')

 app.get("/", requireJWTAuth, (req, res) => {
    res.send("Hello World");
 });
 app.use("/auth", authenController);
 app.listen(3000);