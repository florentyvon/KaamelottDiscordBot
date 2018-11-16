const { Command } = require('discord.js-commando');
const quizz = require('../quizz/quizz.json');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        // Only set client + CommandInfo
        super(client, {
            name: 'rep',
            group: 'quizz',
            memberName: 'rep',
            description: 'reply to quizz',
            examples: ['k!reply arthur', 'Result :', 'Wrong answer'], // string array with different using  (Not Necessary)
            args: [
                {
                    key: 'answer',
                    prompt: 'what is you answer? ',
                    type: 'string',
                }
            ]
        });
    }

    // activated when "!run" is send in channel
    /*
    * WARNING : Node support async method but must specify " --harmony " when run the app
    * so it become : node --harmony . 
    */
    async run(message, { answer }) {  //args are parameter after name command

        if (quizz.game.isOn && answer === quizz.question.currentQuestion.reponse){
            message.reply("Well done, the answer was inded: " + answer+"\n ");
            if( !quizz.score.get[message.author.id]){
                quizz.score[message.author.id]= 1;
            }else{
                quizz.score[message.author.id] = quizz.score[message.author.id]+ 1;
            }
        }
        message.reply("Wrong");

    }
};