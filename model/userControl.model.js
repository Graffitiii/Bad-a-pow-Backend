const mongoose = require('mongoose');


const db = require('../config/db');

const { Schema } = mongoose;

const userControlSchema = new Schema({
    userName:{
        type: String,
        require: true,
        unique: true
    },
    ownerPermission:{
        type: Boolean,
        require: true,
    },
    adminOf:{
        "type": "array",
        "items": {
            "type": "string",
        } 
    },
    ownerOf:{
        "type": "array",
        "items": {
            "type": "string",
        } 
    },
    follow:{
        "type": "array",
        "items": {
            "type": "string",
        } 
    },
    pending:{
        "type": "array",
        "items": {
            "type": "string",
        } 
    },
    join:{
        "type": "array",
        "items": {
            "type": "string",
        } 
    },
    }
);

const UserControlModel = db.model('userControl',userControlSchema);

module.exports = UserControlModel;