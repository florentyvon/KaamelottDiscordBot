const { Command } = require('discord.js-commando');

module.exports = class DiceRollCommand extends Command{
    constructor(client){
        super(client, {
            name: 'roll',
            group: 'random', 
            memberName: 'roll',
            description: 'Lance un dé à X faces', 
            examples: [ 'k!roll <nombre de faces>'], 
            args: [
                {
                    key: 'int',
                    prompt: 'Tu veux lancer un dé à combien de faces ? (4, 6, 8, 10, 20 etc.)',
                    type: 'integer',
                    validate: int => {
                        if (int > 1 && int <= 100) return true;
                        return 'Doit être entre 2 et 100 pour fonctionner';
                    }
                }
            ]
        }); 
    }

    async run(message, {int}){ 
        let roll = Math.floor(Math.random() * int) + 1;
        message.reply("Vous avez obtenu  " + roll + " (1 - " + int + ")"); 
    }
};