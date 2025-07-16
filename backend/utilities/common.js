let database = require("../configure/database")
let responseCode = require("../utilities/responseCode")
const bcrypt = require("bcrypt")
require('dotenv').config();

class common{

    async genereateToken(){
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz123456789"
        let token = ''
        for(let i=0;i<20;i++){
            token = token + str[Math.floor(Math.random() * 60)];
        }
        return token
    }
    async checkUsername(username){
            let usernameQuery = "SELECT * FROM tbl_user WHERE username = ? AND is_deleted = 0"; // Check only active users
            const [res] = await database.query(usernameQuery, [username])
            if(res.length>0){
                return true
            }else{
                return false
            }
    }
    async checkEmail(email){
        let emailQuery = "SELECT * FROM tbl_user WHERE email = ? AND is_deleted = 0"; // Check only active users
        const [res] = await database.query(emailQuery, [email])
        if(res.length>0){
            return true
        }else{
            return false
        }
}
    
    async getHashedPassword(password) {
        const saltRounds = 10
        try{
            const hashedPassword = await bcrypt.hash(password,saltRounds);
            return hashedPassword
        }catch(err){
            return {
                code : responseCode.OPERATION_FAILED,
                keyword : "error in password bycrypt !",
                data : "Error in ByCrypt in Password !"
            }
        }
    }

    async comparePasswords(plainPassword, hashedPassword) {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            if (match) {
                console.log(" Password matched");
                return true;
            } else {
                console.log(" Password did not match");
                return false;
            }
        } catch (error) {
            console.error("Error during password comparison:", error);
            return false;
        }
    }
    async generateOrderNumber() {
        let DigitToken = ""; // Initialize as an empty string
        let StrToken = "";   // Initialize as an empty string
        let digits = "123456789";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
        for (let i = 0; i < 10; i++) {
            DigitToken += digits[Math.floor(Math.random() * digits.length)];
        }
        for (let i = 0; i < 10; i++) {
            StrToken += str[Math.floor(Math.random() * str.length)];
        }
    
        return DigitToken + StrToken;
    }
}

module.exports = new common()