const { Command } = require('discord.js-commando');
const quizz = require('../quizz/quizz.json');
const discord = require('discord.js')

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

    async run(message, { answer }) {  //args are parameter after name command
        let embed = new discord.RichEmbed();

        if (!quizz.game.isOn) {
            embed.setTitle("Command Failed")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Game is already started.")
                .setColor(0xFF0000);
            message.channel.send(embed)
            return;
        }

        if (quizz.game.questionToAnswer.answered) {
            embed.setTitle("Too bad so sad")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Too late, sorry. The Direction.")
                .setColor(0xFF0000);
            message.channel.send(embed);
            return;
        }

        if (answer.toUpperCase() === quizz.question[quizz.game.questionToAnswer.currentQuestion].reponse.toUpperCase()) {
            // set answer as already answered
            quizz.game.questionToAnswer.answered = true;

            // update player score
            if (!quizz.score[message.author.id]) {
                quizz.score[message.author.id] = 1;
            } else {
                quizz.score[message.author.id] = quizz.score[message.author.id] + 1;
            }
            let authorName = message.author;
            // answer to player
            /*message.channel.send("Well done " + message.author + " , the answer was inded: " + answer + 
                                    "\n Your score is now : " + quizz.score[message.author.id]);
*/
            embed.setTitle("Congrats!")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Well done , the answer was inded : " + answer +
                    "\n Your score is now : " + quizz.score[message.author.id])
                .setColor(0x00FF00);

            message.channel.send(embed)

        }
    }
};