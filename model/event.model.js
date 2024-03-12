const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const UserModel = require('./user.model')

const db = require('../config/db');

const { Schema } = mongoose;

const eventSchema = new Schema({
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
    eventdate_start:{
        type: Date,
    },
    eventdate_end:{
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
    active:{
        type: Boolean,
    },
    }
);

const EventModel = db.model('event',eventSchema);

module.exports = EventModel;