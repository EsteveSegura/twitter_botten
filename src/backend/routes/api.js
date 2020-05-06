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
router.get('/tweet', secure.verifyToken, async(req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, async(err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let tweet = await twitterTweet.find({}).limit(10);

            if (tweet) {
                res.json({ "tweet": tweet })
            }
        }
    });
});

//Get the tweets that are approved, limit:10
router.get('/tweet/approved', secure.verifyToken, async(req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, async (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let tweet = await twitterTweet.find({ 'approved': true }).limit(10);
            if (tweet) {
                res.json({ "tweet": tweet })
            }

        }
    });
});

//Get the tweets that are not approved, limit:10
router.get('/tweet/notapproved', secure.verifyToken, async (req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, async (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let tweet = await twitterTweet.find({ 'approved': false }).limit(10);
            if (tweet) {
                res.json({ "tweet": tweet })
            }

        }
    });
});

//Get specific tweet by id
router.get('/tweet/:idTweet', secure.verifyToken, async (req, res) => {
    req.token = req.session.token;
    jwt.verify(req.token, process.env.MASTER_KEY, async (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let tweet = await twitterTweet.findOne({ 'tweetId': req.params.idTweet })
            if (tweet) {
                res.json({ "tweet": tweet })
            }
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
            let tweet = await twitterTweet.findOne({ 'tweetId': req.params.idTweet })
            let twtUser = await twitterUser.findOne({ 'screenName': tweet.user });
            let checkUserDb = await userDb.findOne({ 'userId': twtUser.screenName });
            console.log(checkUserDb)
            if (tweet && twtUser && !checkUserDb) {
                console.log('inside')
                let edit = await twitterTweet.updateOne({ 'tweetId': req.params.idTweet }, { 'approved': true });
                let newUser = new userDb({'userId': twtUser.userId,'tweetId': req.params.idTweet,'magicUrlEndPoint': utils.makeId(7)});
                let savedNewUser = await newUser.save();
                res.json({'approve' :edit, 'newUser': savedNewUser})
            }
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
            let tweet = await twitterTweet.findOne({ 'tweetId': req.params.idTweet })
            if (tweet) {
                let edit = await twitterTweet.updateOne({ 'tweetId': req.params.idTweet }, { 'approved': false });
                res.json(edit)
            }
        }
    });
});

//Regular USER
router.get('/user/login/:magicLink', async (req, res) => {
    let userTryingToLogIn = await userDb.findOne({ 'magicUrlEndPoint': req.params.magicLink })
    console.log(userTryingToLogIn)

    if (userTryingToLogIn) {
        jwt.sign({ 'magicUrlEndPoint': req.params.magicLink }, process.env.MASTER_KEY, (err, token) => {
            req.session.token = token;
            res.json({ 'message': 'OK', 'user': userTryingToLogIn });
        });
    } else {
        res.sendStatus(403);
    }

})

router.get('/test', async (req, res) => {
    let allUsers = await userDb.find({});
    res.json(allUsers)
})

module.exports = router