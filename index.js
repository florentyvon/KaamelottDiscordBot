const config = require("./config.json");
const path = require('path');
const { CommandoClient } = require('discord.js-commando');

const client = new CommandoClient({
    commandPrefix: config.prefix,
    disableEveryone: true
})

client.registry
            .registerGroup('random', 'Random')
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname + "/commands")); // always last !

client.on('message', (message) => functionTest(message));
var functionTest = async function(message)
{
    if(message.content == 'Comment t\'es ce soir ?')
    {
        //message.reply('pong');
        //msg.reply(`Hello! ${emoji}`);
        
        // const emoji = message.guild.emojis.first(); 
        // message.channel.send(`Déchainé moi, déchainé !!! ${emoji}`);
        var msg = await message.channel.send("Déchainé moi, déchainé !!!");
        msg.react("👍");
        msg.react("👎");
    }
};

/*
client.on('ready', () => { // when run bot
    console.log('Logged in!');
    client.user.setActivity('game');
});*/

//TODO : Find a way to hide it
client.login(config.token);