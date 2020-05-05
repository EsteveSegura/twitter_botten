const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let twitterUserSchema = new Schema({
    'screenName': String,
    'name': String,
    'userId': String,
    'avatar': String,
    'history': [{
        'user': String,
        'text': String,
        'tweetId': String,
        'sentimentScore': Number
    }]
});

module.exports = mongoose.model('twitterUser', twitterUserSchema)
