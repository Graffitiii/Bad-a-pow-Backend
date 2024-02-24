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
})

const UserModel = db.model('user',userSchema);

module.exports = UserModel;
