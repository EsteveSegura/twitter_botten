const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let twitterTweetSchema = new Schema({
    'user': String,
    'text': String,
    'tweetId': String,
    'sentimentScore': Number,
    'approved' : {'type': Boolean, 'default': false}
});

module.exports = mongoose.model('twitterTweet', twitterTweetSchema)
