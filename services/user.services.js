const UserModel = require('../model/user.model')
const jwt = require('jsonwebtoken')

class UserService{
    static async registerUser(phonenumber,password,birthDate,userName){
        try{
            const createUser = new UserModel({phonenumber,password,birthDate,userName});
            return await createUser.save();
        }
        catch(err){
            throw err;
        }
    }

    static async checkUser(phonenumber){
        try{
            return await UserModel.findOne({phonenumber});
        }
        catch(error){
            throw error;
        }
    }

    static async generateToken(tokenData,secretKey,jwt_expire){
        return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
    }
}

module.exports = UserService;