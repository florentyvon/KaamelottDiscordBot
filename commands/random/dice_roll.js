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
                    prompt: 'TU veuxl ancer un dé de combien ? (4, 6, 8, 10, 20 etc.)',
                    type: 'integer',
                    validate: int => {
                        if (int >= 1 && int <= 100) return true;
                        return 'Must be between 1 and 100 to be rolled';
                    }
                }
            ]
        }); 
    }

    async run(message, {int}){  //args are parameter after name command
        let roll = Math.floor(Math.random() * int) + 1;
        message.reply("You rolled a " + roll + " (1 - " + int + ")"); 
    }
};