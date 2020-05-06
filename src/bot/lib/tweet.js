const sentimentAnalisis = require('sentiment')
const sentimentES = require('./sentiment-es.json');
const sentiment = new sentimentAnalisis()
sentiment.registerLanguage('es',sentimentES);

/**
 * Class that contains tweet information
 */
class tweet{
    /**
     * @constructor
     * @author GiR
     * @param  {string} user - author of the twet
     * @param  {string} text - raw text of the twet
     * @param  {string} tweetId - unique id for twet
     */
    constructor(user,text,tweetId){
        this.user = user,
        this.text = text,
        this.tweetId = tweetId
        this.sentimentScore = sentiment.analyze(this.text, {'language' : 'es'}).score
    }

    /**
     * Get user name
     * @author GiR
     * @returns {string} - author 
     */
    getUser(){
        return this.user;
    }
    
    /**
     * Get raw text of the tweet
     * @author GiR
     * @returns {string} - raw text 
     */
    getText(){
        return this.text;
    }

    /**
     * Get unique Id
     * @author GiR
     * @returns {string} - tweet id
     */
    getTweetId(){
        return this.tweetId;
    }

    /**
     * Get url twet
     * @author GiR
     * @returns {string} - twet url
     */
    getUrl(){
        return `https://twitter.com/${this.user}/status/${this.tweetId}` 
    }
    
    /**
     * Get the sentiment analisis score
     * @author GiR
     * @returns {number} - sentiment score result
     */
    getSentimentScore(){
        return this.sentimentScore;
    }

    /**
     * Get all object to string
     * @author GiR
     * @returns {string} - toString()
     */
    toString(){
        return(`${this.user}_${this.text}_${this.tweetId}_${this.sentimentScore}`);
    }
}

module.exports = tweet;