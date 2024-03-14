const UserService = require("../services/user.services")
const UserModel = require("../model/user.model")
const bcrypt = require("bcrypt");

exports.register = async(req,res,next)=>{
    try{
        const {phonenumber,password,birthDate,userName,picture,gender,level,about,ageShow} = req.body;

        const successRes = await UserService.registerUser(phonenumber,password,birthDate,userName,picture,gender,level,about,ageShow);

        res.json({status:true,success:'User Registered'})
    }
    catch(error){
        res.json({status:false,success:'Error'})
    }
}

exports.login = async(req,res,next)=>{
    try{
        const {phonenumber,password} = req.body;
        
        const user = await UserService.checkUser(phonenumber);

        console.log(user);
        console.log(password);

        if(!user){
            throw new Error('User dont exist');
            // res.status(401).json({status:true,error:"User dont exist"})
        }

        const isMatch = await user.comparePassword(password);
        // const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch === false){
            throw new Error('Password Invalid');
            // res.status(401).json({status:true,error:"Password Invalid"})
        }

        let tokenData = {_id:user._id,phonenumber:user.phonenumber,userName:user.userName};

        const token = await UserService.generateToken(tokenData,"secretKey",'1h')

        res.status(200).json({status:true,token:token,userName:user.userName})
    }
    catch(error){
        if(error.message == 'User dont exist'){
            res.status(401).json({status:false,error:"User dont exist"})
        }
        else if(error.message == 'Password Invalid'){
            res.status(401).json({status:false,error:"Password Invalid"})
        }
        // res.status(401).json({status:false,success:'Error'})
        // throw error;
    }
}

exports.getUser = async(req,res,next)=>{
    try {
        const userName = req.query.userName;

        let result =  await UserService.getUser(userName);
        
        res.json({status:true,data:result});
    } catch (error) {
        throw error;
    }
}