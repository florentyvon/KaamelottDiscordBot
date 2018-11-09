const commando = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class RandomCitationCommand extends commando.Command{
    constructor(client){
        // Only set client + CommandInfo
        super(client, {
            name: 'citation',
            group: 'citation', 
            memberName: 'citation',
            description: 'Get random citation', 
            examples: [ 'citation' ] // string array with different using  (Not Necessary)
        }); 
    }

    // activated when "!run" is send in channel
    /*
    * WARNING : Node support async method but must specify " --harmony " when run the app
    * so it become : node --harmony . 
    */
    async run(message){  //args are parameter after name command
        fetch('https://kaamelott.chaudie.re/api/random')
        .then(res => res.json())
        .then(function(json) {
            message.reply(json.citation.citation);
        });
    }
};