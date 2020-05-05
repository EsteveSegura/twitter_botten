require('dotenv').config();
const twitterBot = require('../lib/twitterBot');
const Sentiment = require('sentiment');
const translate = require('translate-google');
let sentiment = new Sentiment();
 
(async () =>{
    const bot = new twitterBot(process.env.CONSUMER_KEY,process.env.CONSUMER_SECRET,process.env.ACCESS_TOKEN, process.env.ACCESS_TOKEN_SECRET);
//mal dia en el trabajo
    let findtweets = await bot.searchUsersByExactTextInTweet('tengo mucha deberes', true ,400);
    console.log(findtweets.length)
    for(let i = 0 ; i < findtweets.length ; i++){
        console.log(` - ${findtweets[i].getText()}`);
        /*
        let translationDone = await translate(findtweets[i].getText(), {from : 'es', to: 'en'})
        let isSad = sentiment.analyze(translationDone)
        console.log(isSad)
        */
    }

})();



/*

translate('I speak Chinese', {to: 'zh-cn'}).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})





var sentiment = new Sentiment();
var result = sentiment.analyze('Cats are stupid.');
console.dir(result);    // Score: -2, Comparative: -0.666
*/
