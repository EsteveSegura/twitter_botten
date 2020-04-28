require('dotenv').config();
const twit = require('twit');
const tweet = require('./tweet');

/**
 * Class that handles all bot actions
 */
class Bot {
    
    /**
     * @author GiR
     * @constructor
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
     * @param  {number} secods 
     */
    sleep(secods) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 1000 * s || 1);
        });
    }

    /**
     * This methods returns a search on twitter looking for specific text
     * @author GiR
     * @param  {string} textToSearch
     * @param  {number} count
     * @returns {tweet[]} return array of tweets
     */
    searchUsersByExactTextInTweet(textToSearch, count) {
        return new Promise(async (resolve, reject) => {
            let foundTweets = []
            let twitterAction = await this.T.get('search/tweets', { q: '"' + textToSearch + '"', lang: 'es', count: count || 100 }, function (err, data, response) {
                for (let i = 0; i < data.statuses.length; i++) {
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
     * @param  {string} textToPost
     * @param  {string} imagePath
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
    answerSadPeople(tweetObject) {
        this.T.post('statuses/update', { in_reply_to_status_id: tweetObject.getTweetId(), status: `@${tweetObject.getUser()} Te diria que lo entiendo, pero soy un BOT. Animate.` }, (err, data, response) => { })
    }


}

module.exports = Bot