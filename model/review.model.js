const bcrypt = require("bcrypt");
const mongoose = require('mongoose');


const db = require('../config/db');

const { Schema } = mongoose;

const reviewSchema = new Schema({
    "score": {
        type: Number,
        require: true,
    },
    "comment": {
        type: String,
    },
    "showuser": {
        type: Boolean,
    },
    userName:{
        type: String,
        require: true,
    },
    }
);

const ReviewModel = db.model('review',reviewSchema);

module.exports = ReviewModel;