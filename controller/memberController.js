const bodyParser = require("body-parser");
const dbConnection = require('../config/database');

const memberController = {
    async findMember(username) {
        // console.log(username);
        const member = await dbConnection.getrow('SELECT F_ID as memberId, F_USERNAME as username, F_FIRST_NAME as firstName, F_LAST_NAME as lastName FROM tbl_members WHERE F_USERNAME = :username AND F_STATUS = 1', {username: username})
        if(member) {
            return member
        } else {
            return null
        }
    }
}


module.exports = memberController