const bcrypt = require("bcrypt");
const mongoose = require('mongoose');


const db = require('../config/db');

const { Schema } = mongoose;

const clubSchema = new Schema({
    "owner": {
        type: String,
    },
    "follower": {
        "type": "array",
        "items": {
            "type": "string",
        } 
    },
    clubname:{
        type: String,
        require: true,
    },
    admin:{
        "type": "array",
        "items": {
            "type": "string",
        } 
    },
    event_id:{
        "type": "array",
        "items": {
            "type": "string",
        } 
    },
    }
);

const ClubModel = db.model('club',clubSchema);

module.exports = ClubModel;