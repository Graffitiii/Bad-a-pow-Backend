const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const db = require('../config/db');


const { Schema } = mongoose;

const userSchema = new Schema({
    phonenumber:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    birthDate:{
        type: Date,
        require: true,
    },
    userName:{
        type: String,
        require: true,
        unique: true
    },
    picture:{
        type: String
    },
    gender:{
        type: String
    },
    level:{
        type: String
    },
    about:{
        type: String
    },
    ageShow:{
        type: Boolean
    }
    }
);

userSchema.pre('save',async function(){
    try{
        var user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password,salt);

        user.password = hashpass
    }
    catch (error){
        throw error;
    }
});

userSchema.methods.comparePassword = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword,this.password);
        return isMatch;
    }
    catch (error){
        throw error;
    }
}

const UserModel = db.model('user',userSchema);

module.exports = UserModel;
