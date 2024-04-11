const UserModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

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

    static async editProfile(userName,picture,gender,level,about,ageShow){
        try {
            console.log(userName , picture,gender,level,about,ageShow);
           return await UserModel.findOneAndUpdate({userName : userName},{$set :{picture : picture,gender:gender,level: level,about:about,ageShow:ageShow}})
        } catch (error) {
            throw error;
        }
    }

    static async resetPassword(phonenumber,password){
        try {
            const salt = await(bcrypt.genSalt(10));
            const hashpass = await bcrypt.hash(password,salt);

            return await UserModel.updateOne({phonenumber : phonenumber},{$set :{password : hashpass}});
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;