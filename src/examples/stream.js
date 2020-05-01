
(async () => {

    require('dotenv').config();
    const twitterBot = require('../lib/twitterBot');
    const dataBase = require('../lib/database');

    const db = new dataBase('mongodb://localhost/twitter_botten')
    const bot = new twitterBot(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET, process.env.ACCESS_TOKEN, process.env.ACCESS_TOKEN_SECRET);


    let keywords = [
        'mierda',
        'triste',
        'fingir',
        'tarea',
        'deberes',
        'tristeza',
        'aburrimiento',
        'aburrido',
        'humor',
        'harta',
        'harto',
        'amor'
    ]
    let exactKeywords = [
        'mierda de dia',
        'mierda de vida',
        'mierda de mes',
        'mierda de año',
        'dia de mierda',
        'mes de mierda',
        'año de mierda',
        'todo es una mierda',
        'estoy triste',
        'estoy muy triste',
        'nada me sale bien',
        'fingir que estoy bien',
        'tengo mucha tarea',
        'tengo muchos deberes',
        'demasiados deberes',
        'demasiada tarea',
        'mucha tristeza',
        'tengo tristeza',
        'cuanto aburrimiento',
        'demasiado aburrimiento',
        'estoy aburrido',
        'muy aburrido',
        'tengo mal humor',
        'estoy de mal humor',
        'estoy harto',
        'estoy harta',
        'harto de todo',
        'harta de todo',
        'necesito amor',
        'quiero amor'
    ]
    let count = 0;
    bot.getStreamByKeyWord(keywords, (data) => {
        exactKeywords.forEach(keywordToLook => {
            if (data.getText().includes(keywordToLook)) {
                count += 1;
                console.log(count + ' tweets found')
                console.log(data)
            }
        });
    })

})();
