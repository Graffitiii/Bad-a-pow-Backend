const UserService = require("../services/user.services")

exports.register = async(req,res,next)=>{
    try{
        const {phonenumber,password,birthDate,userName} = req.body;

        const successRes = await UserService.registerUser(phonenumber,password,birthDate,userName);

        res.json({status:true,success:'User Registered'})
    }
    catch(error){
        res.json({status:false,success:'Error'})
    }
}