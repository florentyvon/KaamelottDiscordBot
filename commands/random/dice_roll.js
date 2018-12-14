const { Command } = require('discord.js-commando');

module.exports = class DiceRollCommand extends Command{
    constructor(client){
        // Only set client + CommandInfo
        super(client, {
            name: 'roll',
            group: 'random', 
            memberName: 'roll',
            description: 'Roll a die and see if you\'re lucky', 
            examples: [ 'k!roll 1', 'Result :', 'Congratulations ! You rolled a 1 as you wanted ! or You rolled a 3 but wanted a 1. Try Again !'], // string array with different using  (Not Necessary)
            args: [
                {
                    key: 'int',
                    prompt: 'What would you like the dice to be ? ',
                    type: 'integer',
                    validate: int => {
                        if (int >= 1 && int <= 6) return true;
                        return 'Must be between 1 and 6 to be rolled';
                    }
                }
            ]
        }); 
    }

    // activated when "!run" is send in channel
    /*
    * WARNING : Node support async method but must specify " --harmony " when run the app
    * so it become : node --harmony . 
    */
    async run(message, {int}){  //args are parameter after name command
            let roll = Math.floor(Math.random() * 6) + 1;
            if(roll === int){
                message.reply("Congratulations ! You rolled a " + roll + " (1 - 6) as you wanted !");
            }else{
                message.reply("You rolled a " + roll + " (1 - 6) but wanted a "+ int + ". Try Again !");
            }        
    }
};