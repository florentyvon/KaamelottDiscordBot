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
            examples: ['k!reply arthur', 'Result :', 'Mauvaise réponse'],
            args: [
                {
                    key: 'answer',
                    prompt: 'Quel est votre réponse? ',
                    type: 'string',
                }
            ]
        });
    }

    async run(message, { answer }) { 
        let embed = new discord.RichEmbed();

        //si le jeu n'est pas en cours
        if (!quizz.game.isOn) {
            embed.setTitle("Erreur commande")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Le jeu n'est pas lancé.")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setColor(0xFF0000);
            message.channel.send(embed)
            return;
        }

        //Si la réponse a déja été trouvé.
        if (quizz.game.questionToAnswer.answered) {
            embed.setTitle("Too bad so sad")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Trop tard, désolé. La Direction.")
                .setColor(0xFF0000);
            message.channel.send(embed);
            return;
        }

        //Si c'est la bonne réponse
        if (answer.toUpperCase() === quizz.question[quizz.game.questionToAnswer.currentQuestion].reponse.toUpperCase()) {
            // indication que la question a déja été répondu
            quizz.game.questionToAnswer.answered = true;

            // mise à jur du score du joueur
            if (!quizz.score[message.author.id]) {
                quizz.score[message.author.id] = 1;
            } else {
                quizz.score[message.author.id] = quizz.score[message.author.id] + 1;
            }         
            embed.setTitle("Félicitations!")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Bien joué , la réponse était en effet : " + answer +
                    "\n Votre score est maintenant : " + quizz.score[message.author.id])
                .setColor(0x00FF00);
            message.channel.send(embed)
        }
    }
};