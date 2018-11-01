const commando = require('discord.js-commando');


module.exports = class DiceRollCommand extends commando.Command{
    constructor(client){
        // Only set client + CommandInfo
        super(client, {
            name: 'roll',
            group: 'random', 
            memberName: 'roll',
            description: 'Rolls a die', 
            examples: [ 'roll' ] // string array with different using  (Not Necessary)
        }); 
    }

    // activated when "!run" is send in channel
    /*
    * WARNING : Node support async method but must specify " --harmony " when run the app
    * so it become : node --harmony . 
    */
    async run(message, args){  //args are parameter after name command
            var roll = Math.floor(Math.random() * 6) + 1;
            message.reply("You rolled a " + roll + " (1 - 6)");            
    }
};