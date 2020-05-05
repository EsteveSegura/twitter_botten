
(async () => {
    const Discord = require('discord.js');
    const client = new Discord.Client();


    require('dotenv').config();
    const twitterBot = require('../lib/twitterBot');
    const dataBase = require('../lib/database');

    const db = new dataBase('mongodb://localhost/twitter_botten')
    const bot = new twitterBot(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET, process.env.ACCESS_TOKEN, process.env.ACCESS_TOKEN_SECRET);

    let keywords = [
        'mierda',
        'malo',
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
        'amor',
        'idiota',
        'amigos',
        'sad',
        'rallado',
        'desmotivado',
        'internet',
        'salir'
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
        'tengo deberes',
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
        'quiero amor',
        'soy idiota',
        'no tengo amigos',
        'necesito amigos',
        'amigos idiotas',
        'extraño a mis amigos',
        'echo de menos a mis amigos',
        'estoy sad',
        'puta ke sad',
        'puta que sad',
        'estoy rallado',
        'estoy muy rallado',
        'dia malo',
        'estoy desmotivado',
        'no es mi dia',
        'mierda de internet',
        'internet lento',
        'lento internet',
        'quiero salir',
        'necesito salir',
        'cuando podre salir',
        'cuando se podra salir',
        'cuando podremos salir'

    ]

    let bannedWords = []

    let count = 0;
    bot.getStreamByKeyWord(keywords, (data) => {
        exactKeywords.forEach(keywordToLook => {
            if (data.getText().includes(keywordToLook)) {
                count += 1;
                console.log(count + ' tweets found')
                console.log(data)

                client.channels.cache.get('706560520538554455').send(data.getUrl());
            }
        });
    })

    client.login(process.env.DISCORD_TOKEN);
})();
