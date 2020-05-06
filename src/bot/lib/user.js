/**
 * Class that handles twitter user
 */
class User{
    /**
     * 
     * @author GiR
     * @param  {string} screenName
     * @param  {string} name
     * @param  {string} userId
     * @param  {string} avatar
     * @param  {tweet[]} history
     */
    constructor(screenName, name, userId, avatar, history){
        this.screenName = screenName,
        this.name = name, 
        this.userId = userId,
        this.avatar = avatar,
        this.history = history
    }
    
    /**
     * 
     * @author GiR
     * @returns {string}
     */
    getUser(){
        return this.screenName
    }

    /**
     * 
     * @author GiR
     * @returns {string}
     */
    getFullName(){
        return this.name;
    }

    /**
     * 
     * @author GiR
     * @returns {string}
     */
    getId(){
        return this.userId;
    }

    /**
     * 
     * @author GiR
     * @returns {string}
     */
    getAvatarUrl(){
        return this.avatar;
    }

    /**
     * 
     * @author GiR
     * @returns {string}
     */
    getProfileUrl(){
        return `https://twitter.com/${this.screenName}`;
    }
}

module.exports = User;