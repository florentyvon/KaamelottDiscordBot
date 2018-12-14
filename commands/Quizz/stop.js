const { Command } = require('discord.js-commando');
const quizz = require('../quizz/quizz.json');
const discord = require('discord.js')

module.exports = class StopCommand extends Command {
    constructor(client) {
        // Only set client + CommandInfo
        super(client, {
            name: 'stop',
            group: 'quizz',
            memberName: 'stop',
            description: 'stop a quizz',
            examples: ['k!stop', 'Result :', 'do you want to stop this quiz? \n react to vote'], // string array with different using  (Not Necessary)
        });
    }

    async run(message) {  //args are parameter after name command
        let embed = new discord.RichEmbed();

        if(!quizz.game.isOn) { 
            embed.setTitle("Command Failed")
                 .setDescription(message.author + "Game is not started.")
                 .setColor(0xFF0000);
            message.channel.send(embed)
            return; 
        }

        embed.setTitle("Game Stop")
             .setDescription("Do you want to stop this quiz? \n👍 / 👎\nEnd in 15 seconds")
             .setColor(0x0000FF);
        let msg = await message.channel.send(embed);
        await msg.react("👍");
        await msg.react("👎");
        
        const reactions = await msg.awaitReactions(react=>react.emoji.name==="👍" || react.emoji.name=== "👎" , {time: 15000})

        if(reactions.get("👍").count >= reactions.get("👎").count){
            quizz.game.isOn=false;
            embed.setTitle("Game End")
                 .setDescription("Democracy talked, quiz is over mates !")
                 .setColor(0x0000FF);
            message.channel.send(embed);
        }else{
            
            embed.setTitle("Game Continue")
                 .setDescription("Thought quiz was over ? It's a noooo ! Keep going on !")
                 .setColor(0x0000FF);
            message.channel.send(embed);            
        }
    }
};