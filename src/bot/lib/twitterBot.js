require('dotenv').config();
const twit = require('twit');
const tweet = require('./tweet');
const user = require('./user')

/**
 * Class that handles all twitter actions
 */
class Bot {
    
    /**
     * @constructor
     * @author GiR
     * @param  {string} consumer_key - twitter credentials
     * @param  {string} consumer_secret - twitter credentials
     * @param  {string} access_token - twitter credentials
     * @param  {string} access_token_secret - twitter credentials
     */
    constructor(consumer_key, consumer_secret, access_token, access_token_secret) {
        this.T = new twit({
            consumer_key: consumer_key,
            consumer_secret: consumer_secret,
            access_token: access_token,
            access_token_secret: access_token_secret
        });
    }

    /**
     * Sleep 'x' seconds to continue with async/await actions
     * @Author GiR
     * @param  {number} seconds - seconds to wait, after do another action
     */
    sleep(seconds) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 1000 * seconds || 1);
        });
    }

    /**
     * This methods returns a search on twitter looking for specific text
     * @author GiR
     * @param  {string} textToSearch - text to search in tweets.
     * @param  {boolean} strictSearch - looking for exact text or no.
     * @param  {number} count - how many tweets to retrieve.
     * @returns {tweet[]} return array of tweets.
     */
    searchUsersByExactTextInTweet(textToSearch, strictSearch = true, count) {
        return new Promise(async (resolve, reject) => {
            let foundTweets = []
            let twitterAction = await this.T.get('search/tweets', (strictSearch ? {  q:  '"' + textToSearch + '"', lang: 'es', count: count || 100 } :  {  q:  textToSearch, lang: 'es', count: count || 100 } ), function (err, data, response) {
                for (let i = 0; i < data.statuses.length; i++) {
                    //console.log(data.statuses[i].user)
                    if (!data.statuses[i].in_reply_to_status_id && !data.statuses[i].retweeted && !data.statuses[i].text.startsWith('RT')) {
                        let actualTweet = new tweet(data.statuses[i].user.screen_name, data.statuses[i].text, data.statuses[i].id_str)
                        foundTweets.push(actualTweet);
                    }
                }
                resolve(foundTweets);
            });
        });
    }

    /**
     * This method allows us to upload an image to our timeline
     * @author GiR
     * @param  {string} textToPost - text to tweet with image.
     * @param  {string} imagePath - path to image.
     */
    uploadImage(textToPost, imagePath) {
        //Encoding image to Base64
        let b64content = fs.readFileSync(imagePath, { encoding: 'base64' })

        //Creating resource in the server
        this.T.post('media/upload', { media_data: b64content }, function (err, data, response) {
            let mediaIdStr = data.media_id_string
            let meta_params = { 'media_id': mediaIdStr }

            //Creating metadata for image
            this.T.post('media/metadata/create', meta_params, (err, data, response) => {
                if (!err) {
                    let params = { 'status': textToPost, media_ids: [mediaIdStr] }
                    //Creating the tweet
                    this.T.post('statuses/update', params, (err, data, response) => {
                        console.log('Image Uploaded!');
                    });
                }
            });
        });
    }

    /**
     * Answer easyli a tweet
     * @author GiR
     * @param  {tweet} tweetObject - objectTweet for answering
     */
    replyToTweet(tweetObject) {
        this.T.post('statuses/update', { in_reply_to_status_id: tweetObject.getTweetId(), status: `@${tweetObject.getUser()} Te diria que lo entiendo, pero soy un BOT. Animate.` }, (err, data, response) => { 
            if(err){
                throw err;
            }
        });
    }
    /**
     * Search for user by screenName and returns a user type object
     * @author GiR
     * @param  {string} screenName - the @ name on twitter
     * @returns {user} - return object Type user
     */
    getUserByScreenName(screenName){ 
        return new Promise((resolve,reject) => {
            let tweetsArray = [];
            this.T.get('statuses/user_timeline' , { 'screen_name' : screenName, count: 200}, function (err, data, response) {
                for(let i = 0 ; i < data.length ; i++){
                    let actualTweet = new tweet(data[i].user.screen_name, data[i].text, data[i].id_str)
                    tweetsArray.push(actualTweet)
                }
                if(typeof data[0] === "undefined"){
                    reject(false)
                }else{
                    let twitterUser = new user(screenName, data[0].user.name, data[0].user.id_str ,data[0].user.profile_image_url, tweetsArray)
                    resolve(twitterUser)
                }
            });
        });
    }
    /**
     * Streams new twets when they are created
     * @author GiR
     * @param  {string[]} arrayKeywords - array with the keywords to stream
     * @param  {function} callback - callback that handles all streams
     */
    getStreamByKeyWord(arrayKeywords,callback){
        let stream = this.T.stream('statuses/filter', { track: arrayKeywords })
        stream.on('tweet', function (data) {
            if (!data.in_reply_to_status_id && !data.retweeted && !data.text.startsWith('RT')) {
                let actualTweet = new tweet(data.user.screen_name, data.text, data.id_str)
                callback(actualTweet);
            }
        });
    }

}

module.exports = Bot