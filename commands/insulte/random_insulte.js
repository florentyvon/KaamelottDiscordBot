const commando = require('discord.js-commando');
const insultes = require('./data.json');

module.exports = class RandomInsulteCommand extends commando.Command{
    constructor(client){
        // Only set client + CommandInfo
        super(client, {
            name: 'insulte',
            group: 'insulte', 
            memberName: 'insulte',
            description: 'Get random insult', 
            examples: [ 'k!insulte @user' ], // string array with different using  (Not Necessary)
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to insult ? ',
                    type: 'user'
                }
            ]
        }); 
    }

    // activated when "!run" is send in channel
    /*
    * WARNING : Node support async method but must specify " --harmony " when run the app
    * so it become : node --harmony . 
    */
    async run(message, { user }) {
		var nb = Object.keys(insultes).length;
        var mess = Math.floor(Math.random() * nb)+1;
        message.delete();
		if(user.id === '507258744309022721'){
			message.reply(insultes[mess]);
		}else{
			message.channel.send(user+', '+insultes[mess]);
		}		
}

};