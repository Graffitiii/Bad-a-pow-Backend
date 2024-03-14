const UserModel = require('../model/user.model')
const jwt = require('jsonwebtoken')

class UserService{
    static async registerUser(phonenumber,password,birthDate,userName,picture,gender,level,about,ageShow){
        try{
            const createUser = new UserModel({phonenumber,password,birthDate,userName,picture,gender,level,about,ageShow});
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

    static async getUser(userName){
        try {
            return await UserModel.findOne({userName : userName});
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;