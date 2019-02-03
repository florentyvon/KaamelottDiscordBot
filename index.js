const { CommandoClient } = require('discord.js-commando');
const { prefix, token } = require("./config.json");
const path = require('path');

const bot = new CommandoClient({
    commandPrefix: prefix,
    disableEveryone: true,
    unknownCommandResponse: true
})

bot.registry
    .registerGroups([
        ['random', 'random'],
        ['citation', 'citation'],
        ['insulte', 'insulte'],
        ['quizz', 'quizz'],
        ['reveil', 'reveil'],
        ['presentation', 'presentation']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname + "/commands")); // always last !

bot.on('ready', () => { // when run bot
    console.log('Connexion Réussie');
    let channels = [...bot.channels.keys()];
    channel = channels[Math.floor(Math.random() * channels.length)];
    while (bot.channels.get(channel).type === "voice") {
        channel = channels[Math.floor(Math.random() * channels.length)];
    }
    bot.channels.get(channel).send("À ROULEEEEETTES !!");
    bot.user.setActivity('Cul de Chouette');
    bot.user.setUsername('KaamelottDiscordBot');
    bot.user.setAvatar('Kaamelott.png');
});

bot.login(token);