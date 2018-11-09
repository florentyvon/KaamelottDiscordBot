const commando = require('discord.js-commando');
const insultes = require('./data.json');

module.exports = class RandomInsulteCommand extends commando.Command{
    constructor(client){
        var nb = Object.keys(insultes).length;
        var mess = Math.floor(Math.random() * nb)+1;
        // Only set client + CommandInfo
        super(client, {
            name: 'insulte',
            group: 'insulte', 
            memberName: 'insulte',
            description: 'Get random insult', 
            examples: [ 'k!insulte @user', 'k!insulte @user insult_id', 'Try k!insultelist to know all insult IDs' ], // string array with different using  (Not Necessary)
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to insult ? ',
                    type: 'user',
                },
                {
                    key : 'id',
                    prompt : 'Do you wnat to send a precise insult ?',
                    type : 'integer',
                    default : mess
                }
            ]
        }); 
    }

    // activated when "!run" is send in channel
    /*
    * WARNING : Node support async method but must specify " --harmony " when run the app
    * so it become : node --harmony . 
    */
    async run(message, { user, id }) {
		//var nb = Object.keys(insultes).length;
        // var mess = Math.floor(Math.random() * nb)+1;
        message.delete();
		if(user.id === '507258744309022721'){
			message.reply(insultes[id]);
		}else{
			message.channel.send(user+', '+insultes[id]);
		}		
    }
};