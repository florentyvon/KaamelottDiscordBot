const { Command } = require('discord.js-commando');
const quizz = require('../quizz/quizz.json');

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

    // activated when "!run" is send in channel
    /*
    * WARNING : Node support async method but must specify " --harmony " when run the app
    * so it become : node --harmony . 
    */
    async run(message) {  //args are parameter after name command

        var msg = await message.channel.send("do you want to stop this quiz? \n 👍 / 👎  \n End in 15 seconds ");
        msg.react("👍");
        msg.react("👎");
        
        const reactions = await msg.awaitReactions(react=>react.emoji.name==="👍" || react.emoji.name=== "👎" , {time: 15000})

        if(reactions.get("👍").count > reactions.get("👍").count){
            quizz.game.isOn=false;
        }

    }
};