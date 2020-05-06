const mongoose = require('mongoose');
const twitterUserModel = require('../models/twitterUser');
const twitterTweetModel = require('../models/twitterTweet');

/**
 * Class that handles all database actions
 */
class dataBase {
    
    /**
     * @author GiR
     * @constructor
     * @param  {string} uri - uri to conect directlly with mongoDB
     */
    constructor(uri) {
        this.uri = uri
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => console.log('Connected to database')).catch((err) => console.log('Fail conecting to database'))
    }
    
    /**
     * Add new record for user in database
     * @author GiR
     * @param  {user} twitterUser - twitterUser pushed to db
     */
    async addNewUser(twitterUser) {
        return new Promise(async (resolve, reject) => {
            twitterUserModel.findOne({ 'userId': twitterUser.userId }, async (err, user) => {
                if (err) {
                    reject(err);
                }

                if (user) {
                    console.log('-- USER ALREADY IN DB --')
                    resolve({ 'message': 'user already exists.' })
                } else {
                    let newTwitterUser = new twitterUserModel(twitterUser);
                    await newTwitterUser.save(async (err) => {
                        if (err) {
                            reject(err)
                        }
                        resolve({ 'message': 'User added to database.' })
                    });
                }

            });

        });
    }
    /**
     * Add new record for twet in database
     * @author GiR
     * @param  {tweet} twitterTweet - tweet pushed to db
     */
    async addNewTweet(twitterTweet) {
        return new Promise(async (resolve, reject) => {
            twitterTweetModel.findOne({ 'tweetId': twitterTweet.tweetId }, async(err, tweet) => {
                if (err) {
                    reject(err)
                }

                if (tweet) {
                    //console.log(tweet)
                    console.log('-- TWEET ALREADY IN DB --')
                    resolve({ 'message': 'Tweet already exists.' })
                } else {
                    let newTwitterTweet = new twitterTweetModel(twitterTweet);
                    await newTwitterTweet.save(async (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve({ 'message': 'Tweet added to database.' });
                    });
                }
            });

        });

    }
}


module.exports = dataBase;