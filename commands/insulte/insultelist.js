const commando = require('discord.js-commando');
const insultes = require('./data.json');

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

    // activated when "!run" is send in channel
    /*
    * WARNING : Node support async method but must specify " --harmony " when run the app
    * so it become : node --harmony . 
    */
    async run(message) {
        let tosend = "\n\ninsult_ID : insult_text\n";
        Object.keys(insultes).forEach(element => {
            tosend += element + " : " + insultes[element] + "\n";
        });
        tosend += 'Try k!insulte @user insult_ID'
        message.delete();
        message.reply('Sent you a DM with infos');
        message.author.send(tosend);
    }
};