const config = require("./config.json");
const path = require('path');
const { CommandoClient } = require('discord.js-commando');

const bot = new CommandoClient({
    commandPrefix: config.prefix,
    disableEveryone: true
})

bot.registry
            .registerGroup('random', 'Random')
            .registerDefaults()
            .registerCommandsIn(path.join(__dirname + "/commands")); // always last !

bot.on('message', (message) => functionTest(message));
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

bot.on('ready', () => { // when run bot
    console.log('Logged in!');
    bot.user.setActivity('Cul de Chouette');
    bot.user.setUsername('KaamelottDiscordBot');
});

//TODO : Find a way to hide it
bot.login(config.token);