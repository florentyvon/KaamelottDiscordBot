const { CommandoClient } = require('discord.js-commando');
const { prefix, token } = require("./config.json");
const path = require('path');

const bot = new CommandoClient({
    commandPrefix: prefix,
    disableEveryone: true,
    unknownCommandResponse: false
})

bot.registry
            .registerGroups([
                ['random', 'random'],
                ['citation', 'citation'],
                ['insulte', 'insulte'],
                ['quizz','quizz']
            ])
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
    var channels = [...bot.channels.keys()];
    console.log(channels.length);
    channel = channels[Math.floor(Math.random() * channels.length) + 1]
    bot.channels.get(channel).sendMessage("Coucou C'est Moi");
    bot.user.setActivity('Cul de Chouette');
    bot.user.setUsername('KaamelottDiscordBot');

});

//TODO : Find a way to hide it
bot.login(token);