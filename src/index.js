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
        let sadPeople = []
        let twitterAction = await T.get('search/tweets', { q: '"' + sadText + '"', lang:'es', count: 100 }, function(err, data, response) {
            for(let i = 0 ; i < data.statuses.length;i++){
                if(!data.statuses[i].in_reply_to_status_id && !data.statuses[i].retweeted && !data.statuses[i].text.startsWith('RT')){
                    sadPeople.push({
                        "text": data.statuses[i].text,
                        "user":data.statuses[i].user.screen_name,
                        "tweetId":data.statuses[i].id_str,
                    });
                }
            }
            resolve(sadPeople)
        });
    });
}

function answerSadPeople(data){
    console.log(data.tweetId)
    T.post('statuses/update', { in_reply_to_status_id: data.tweetId, status: `@${data.user} Te diria que lo entiendo, pero soy un BOT. Animate.` }, (err, data, response) => {
        
    })
}

(async () => {
    let sadPeople = await getSadPeople('Estoy muy triste');
    console.log(`I found some sad people : ${sadPeople.length} tweets`)
    for(let i = 0 ; i < sadPeople.length ; i++){
        answerSadPeople(sadPeople[i])
        console.log(`+1 answer to https://twitter.com/${sadPeople[i].user}/status/${sadPeople[i].tweetId}`)
        await asyncSleep(80);
    }
    //console.log(sadPeople)
})();