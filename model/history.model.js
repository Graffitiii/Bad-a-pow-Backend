const mongoose = require('mongoose');


const db = require('../config/db');

const { Schema } = mongoose;

const historySchema = new Schema({
    join:{
        "type": "array",
        "items": {
            "type": "string",
        } 
    },
    clubname:{
        type: String,
    },
    eventdate_start:{
        type: Date,
    },
    eventdate_end:{
        type: Date,
    },
    placename:{
        type: String,
    },
    }
);

const HistoryModel = db.model('history',historySchema);

module.exports = HistoryModel;