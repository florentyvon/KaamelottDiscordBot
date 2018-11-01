const config = require("./config.json");
const path = require('path');
const { CommandoClient } = require('discord.js-commando');

const client = new CommandoClient({
    commandPrefix: config.prefix,
    disableEveryone: true
})

client.registry
            .registerDefaultTypes()
            .registerDefaultGroups()
            .registerDefaultCommands()
            .registerGroup('random', 'Random')
            .registerCommandsIn(path.join(__dirname + "/commands")); // always last !

client.on('message', (message) => {
        
    if(message.content == 'Comment t\'es ce soir ?')
    {
        //message.reply('pong');
        message.channel.send('Déchainé moi, déchainé !!!');
    }
});

/*
client.on('ready', () => { // when run bot
    console.log('Logged in!');
    client.user.setActivity('game');
});*/

//TODO : Find a way to hide it
client.login(config.token);