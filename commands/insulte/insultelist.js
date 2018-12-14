const commando = require('discord.js-commando');
const insultes = require('./data.json');
const discord = require('discord.js');

module.exports = class RandomInsulteCommand extends commando.Command{
    constructor(client){
        // Only set client + CommandInfo
        super(client, {
            name: 'insultelist',
            group: 'insulte', 
            memberName: 'insultelist',
            description: 'Get insults list', 
            examples: [ 'k!insulteslist' ], // string array with different using  (Not Necessary)
        }); 
    }

    async run(message) {
        let tosend = "\n\ninsult_ID : insult_text\n";
        Object.keys(insultes).forEach(element => {
            tosend += element + " : " + insultes[element] + "\n";
        });
        tosend += 'Try k!insulte @user insult_ID'
        message.delete();
        let embed = new discord.RichEmbed();
        embed
        .setAuthor(message.author.username,message.author.avatarURL)
        .setDescription('Sent you a DM with infos')
        .setColor(0x00ae86);
        message.channel.send(embed);
        message.author.send(tosend);
    }
};