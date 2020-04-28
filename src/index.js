(async () => {
    const Bot = require('./lib/twitterBot')
    const botTwitter = new Bot('FlyunnvsRSlHSftFv3nrbTnDv','KCWcGXUeAdhLV9jXZHMzHInnsZyFIhnaVTFwyxrFttpOzkl69k','1146809372871417860-n7h6nlYXPJ9YE2FrQvbx58YsGZzaQg','x8i6bPiX1tE6JSoh52albjU1XUDe6CfJD4V9jdiGHtKOO');

    /*
    let sadTweets = await botTwitter.searchUsersByExactTextInTweet('que dia de mierda');
    for(let i = 0 ; i < sadTweets.length;i++){
        console.log(`- @${sadTweets[i].getUser()}: ${sadTweets[i].getText()}\n${sadTweets[i].getUrl()}`)
    }
    */

    let extractTweetsFromUser = await botTwitter.getUserByScreenName('girlazote')
    console.log(extractTweetsFromUser)
})();