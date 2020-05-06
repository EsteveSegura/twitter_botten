const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secure = require('../lib/secure');
const admin = require('../admin.json')

const twitterTweet = require('../models/twitterTweet');
const twitterUser = require('../models/twitterUser');
const userDb = require('../models/user');
const utils = require('../lib/utils')

// MAIN
router.get('/', (req, res) => {
    res.json({ 'message': 'Server OK' });
});

// USER SYSTEM

//Checking admin user&&pw and creating token
router.post('/auth/login', (req, res) => {
    admin.forEach(credentials => {
        if (credentials.name == req.body.name && credentials.password == req.body.password) {
            jwt.sign({ 'name': credentials.name }, process.env.MASTER_KEY, (err, token) => {
                req.session.token = token;
                res.json({ 'message': 'OK', 'token': token });
            })
        } else {
            res.json({ 'message': 'NOT OK' });
        }
    });
});

//Area for private admins
router.get('/auth/sucess', secure.verifyToken, (req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({ 'message': 'private area' })
        }
    })
});

//CRUD ADMIN tweet area

//Get las tweets, limit:10
router.get('/tweet', secure.verifyToken, (req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            twitterTweet.find({}, (err, tweet) => {
                if (err) {
                    throw err;
                }
                if (tweet) {
                    res.json({ "tweet": tweet })
                }
            }).limit(10);
        }
    });
});

//Get the tweets that are approved, limit:10
router.get('/tweet/approved', secure.verifyToken, (req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            twitterTweet.find({ 'approved': true }, (err, tweet) => {
                if (err) {
                    throw err;
                }
                if (tweet) {
                    res.json({ "tweet": tweet })
                }
            }).limit(10);
        }
    });
});

//Get the tweets that are not approved, limit:10
router.get('/tweet/notapproved', secure.verifyToken, (req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            twitterTweet.find({ 'approved': false }, (err, tweet) => {
                if (err) {
                    throw err;
                }
                if (tweet) {
                    res.json({ "tweet": tweet })
                }
            }).limit(10);
        }
    });
});

//Get specific tweet by id
router.get('/tweet/:idTweet', secure.verifyToken, (req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            twitterTweet.findOne({ 'tweetId': req.params.idTweet }, (err, tweet) => {
                if (err) {
                    throw err;
                }
                if (tweet) {
                    res.json({ "tweet": tweet })
                }
            });
        }
    });
});

//Make tweet ready for tristinder
router.post('/tweet/approve/:idTweet', secure.verifyToken, async (req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, async (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            twitterTweet.findOne({ 'tweetId': req.params.idTweet }, async (err, tweet) => {
                if (err) {
                    throw err;
                }
                if (tweet) {
                    //CONVERT TO CALLBACK
                    //AND REMOVE ASYNCS
                    let edit = await twitterTweet.updateOne({ 'tweetId': req.params.idTweet }, { 'approved': true });

                    //CREATE MAGIC LINK AND EVERYTHING TO MAKE IT WORKS
                    twitterUser.findOne({ 'screenName': tweet.user }, async (err, _twitterUser) => {
                        if (err) {
                            throw err;
                        }
                        userDb.findOne({ 'userId': _twitterUser.screenName }, async (err, _userDb) => {
                            if (err) {
                                throw err;
                            }

                            if (_userDb) {
                                res.json({ "message": "error" })
                            } else {
                                if (_twitterUser) {
                                    let newUser = new userDb({
                                        'userId': _twitterUser.userId,
                                        'tweetId': req.params.idTweet,
                                        'magicUrlEndPoint': utils.makeId(7)
                                    });
                                    await newUser.save(async (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    });
                                }
                            }

                        });
                    });
                    res.json({ "tweet": tweet, "approved": true })
                }
            });
        }
    });
});

//Make tweet NOT ready for tristinder
router.post('/tweet/disapprove/:idTweet', secure.verifyToken, async (req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, async (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            twitterTweet.findOne({ 'tweetId': req.params.idTweet }, async (err, tweet) => {
                if (err) {
                    throw err;
                }
                if (tweet) {
                    //CONVERT TO CALLBACK
                    //AND REMOVE ASYNCS
                    let edit = await twitterTweet.updateOne({ 'tweetId': req.params.idTweet }, { 'approved': false });


                    console.log(edit)
                    res.json({ "tweet": tweet, "approved": true })
                }
            });
        }
    });
    //
});

//Regular USER
router.get('/user/login/:magicLink', (req, res) => {
    userDb.findOne({ 'magicUrlEndPoint' : req.params.magicLink }, (err, user) => {
        if (err) {
            throw err;
        }

        if (user) {
            jwt.sign({ 'magicUrlEndPoint': req.params.magicLink }, process.env.MASTER_KEY, (err, token) => {
                req.session.token = token;
                res.json({ 'message': 'OK', 'user': user });
            });
        } else {
            res.sendStatus(403);
        }
    });
})

module.exports = router