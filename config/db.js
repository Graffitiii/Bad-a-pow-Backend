const mongoose = require("mongoose");

// const { MONGO_URI } = process.env;

const connection = mongoose.createConnection('mongodb+srv://badapow:0UUYnBL6VYtvGXdj@bad-a-pow.1occ5wu.mongodb.net/BadAPow').on('open', () => {
    console.log("MongoDb Connected");
}).on('error', () => {
    console.log("MongoDb connectgion error");
});

module.exports = connection