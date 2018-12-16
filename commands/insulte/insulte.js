const commando = require('discord.js-commando');
const insultes = require('./insults.json');
const discord = require('discord.js');

module.exports = class RandomInsulteCommand extends commando.Command{
    constructor(client){
        let nb = Object.keys(insultes).length;
        let mess = Math.floor(Math.random() * nb)+1;
        // Only set client + CommandInfo
        super(client, {
            name: 'insulte',
            group: 'insulte', 
            memberName: 'insulte',
            description: 'Send a random insult to someone', 
            aliases:['i'],
            examples: [ 'k!insulte @user', 'k!insulte @user insult_id', 'Try k!insultelist to know all insult IDs' ], // string array with different using  (Not Necessary)
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to insult ? ',
                    type: 'user',
                },
                {
                    key : 'id',
                    prompt : 'Do you want to send a precise insult ?',
                    type : 'integer',
                    default : mess
                }
            ]
        }); 
    }

    async run(message, { user, id }) {
        message.delete();
		if(user.id === '507258744309022721'){
			message.reply(insultes[id]['text']);
		}else{
			message.channel.send(user+', '+insultes[id]['text']);
		}		
    }
};