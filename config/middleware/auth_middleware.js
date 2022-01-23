const express = require("express");
const bodyParser = require("body-parser");
const memberController = require('../../controller/memberController');

const app = express();
app.use(bodyParser.json());
const passport = require("passport");
//ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt;
//ใช้ในการประกาศ Strategy
const JwtStrategy = require("passport-jwt").Strategy;
const SECRET = "ENG_EXAM_NODEJS_API";

//สร้าง Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("eng-session"),
    secretOrKey: SECRET
 };
 const jwtAuth = new  JwtStrategy(jwtOptions, async (payload, done) => {
   member = await memberController.findMember(payload.sub[0].username);
   if(member) {
      done(null, true)
   } else {
      dine(null, false)
   }
 });
 //เสียบ Strategy เข้า Passport
 passport.use(jwtAuth);
 //ทำ Passport Middleware
 const requireJWTAuth = passport.authenticate("jwt",{session:false});
 //เสียบ middleware ยืนยันตัวตน JWT เข้าไป

module.exports = requireJWTAuth;