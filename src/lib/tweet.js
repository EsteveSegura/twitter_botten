class tweet{
    constructor(user,text,tweetId){
        this.user = user,
        this.text = text,
        this.tweetId = tweetId
    }

    getUser(){
        return this.user;
    }

    getText(){
        return this.text;
    }

    getTweetId(){
        return this.tweetId;
    }

    getUrl(){
        return `https://twitter.com/${this.user}/status/${this.getTweetId}` 
    }

    toString(){
        return(`${this.user}_${this.text}_${this.tweetId}`);
    }
}

module.exports = tweet;