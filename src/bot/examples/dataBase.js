/* 
 

*/
(async () => {
    require('dotenv').config();
    const twitterBot = require('../lib/twitterBot');
    const dataBase = require('../lib/database');

    const db = new dataBase('mongodb://localhost/twitter_botten')
    const bot = new twitterBot(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET, process.env.ACCESS_TOKEN, process.env.ACCESS_TOKEN_SECRET);

    const sadSentences = [
        /*'acongojado',
        'angustia',
        'angustiado',
        'lugubre',
        'taciturno',
        'tristeza',
        'se murio serie',
        'todo sale mal',
        'que triste',
        'dia de mierda',
        'que mierda de todo',
        'termine la serie',*/
        'se termino todo',
        'estoy triste'
    ]

    for (let b = true; b == true; b = true) {
        sadSentences.forEach(async (sentence) => {
            let tweetsSad = await bot.searchUsersByExactTextInTweet(sentence, true, 3000)

            for (let i = 0; i < tweetsSad.length; i++) {

                await db.addNewTweet(tweetsSad[i]);
                let authorOfTweet = await bot.getUserByScreenName(tweetsSad[i].getUser());
                await db.addNewUser(authorOfTweet);
                console.log(`-Tweet Added to DB: ${tweetsSad[i].getText()}`)
                console.log(`-User Added to DB: ${tweetsSad[i].getUser()}`)
            }
        });
        await bot.sleep(300)
    }
})();
