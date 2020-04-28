require('dotenv').config();
const twit = require('twit');

let T = new twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

function asyncSleep(s){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(true)
        }, 1000 * s || 1);
    })
}

function getSadPeople(sadText){
    return new Promise(async(resolve,reject) => {
        let foundTweets = []
        let twitterAction = await T.get('search/tweets', { q: '"' + sadText + '"', lang:'es', count: 100 }, function(err, data, response) {
            for(let i = 0 ; i < data.statuses.length;i++){
                if(!data.statuses[i].in_reply_to_status_id && !data.statuses[i].retweeted && !data.statuses[i].text.startsWith('RT')){
                    foundTweets.push({
                        "text": data.statuses[i].text,
                        "user":data.statuses[i].user.screen_name,
                        "tweetId":data.statuses[i].id_str,
                    });
                }
            }
            resolve(foundTweets);
        });
    });
}

function answerSadPeople(data){
    console.log(data.tweetId)
    T.post('statuses/update', { in_reply_to_status_id: data.tweetId, status: `@${data.user} Te diria que lo entiendo, pero soy un BOT. Animate.` }, (err, data, response) => {})
}

/**************************************** 
 * Name: uploadImage 
 * Type: Void
 * Description: This method allows us to upload an image to our timeline
 **************  PARAMS  ****************
 * text(String): Text to tweet.
 * imagePath(String): Path to image.
 ***************  USAGE  ****************
 * uploadImage('Me and my dog', './img/WithMyDog.jpg');
*****************************************/
function uploadImage(text,imagePath) {
    //Encoding image to Base64
    let b64content = fs.readFileSync(imagePath, { encoding: 'base64' })

    //Creating resource in the server
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        let mediaIdStr = data.media_id_string
        let meta_params = { 'media_id': mediaIdStr }

        //Creating metadata for image
        T.post('media/metadata/create', meta_params, (err, data, response) => {
            if (!err) {
                let params = { 'status': text, media_ids: [mediaIdStr] }
                //Creating the tweet
                T.post('statuses/update', params, (err, data, response) => {
                    console.log('Image Uploaded!');
                });
            }
        });
    });
}

(async () => {
    let sadPeople = await getSadPeople('Estoy muy triste');
    console.log(`I found some sad people : ${sadPeople.length} tweets`)
    for(let i = 0 ; i < sadPeople.length ; i++){
        //answerSadPeople(sadPeople[i])
        //console.log(`+1 answer to https://twitter.com/${sadPeople[i].user}/status/${sadPeople[i].tweetId}`)
        //await asyncSleep(80);
    }
    //console.log(sadPeople)
})();