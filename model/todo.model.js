const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const UserModel = require('../model/user.model')

const db = require('../config/db');

const { Schema } = mongoose;

const todoSchema = new Schema({
    "image": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uri"
        }
    },
    club:{
        type: String,
        require: true,
    },
    contact:{
        type: String,
        require: true,
    },
    eventdate:{
        type: Date,
    },
    level:{
        "type": "array",
        "minItems": 1,
        "maxItems": 5,
        "items": {
            "type": "string",
        } 
    },
    brand:{
        type: String,
    },
    price_badminton:{
        type: String,
    },
    priceplay:{
        type: String,
    },
    details:{
        type: String,
    },
    }
);

const ToDoModel = db.model('todo',todoSchema);

module.exports = ToDoModel;