const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    'userId': String,
    'tweetId': String,
    'magicUrlEndPoint': String
});

module.exports = mongoose.model('user', userSchema)
