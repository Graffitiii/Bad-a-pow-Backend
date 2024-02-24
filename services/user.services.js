const UserModel = require('../model/user.model')

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
}

module.exports = UserService;