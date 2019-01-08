const { Command } = require('discord.js-commando');
const quizz = require('../quizz/quizz.json');
const discord = require('discord.js')

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rep',
            group: 'quizz',
            memberName: 'rep',
            description: 'répond au quizz',
            examples: ['k!rep arthur', 'Resultat :', 'Mauvaise/bonne réponse'],
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
            embed.setTitle("Dommage !")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setThumbnail('https://pngimg.com/uploads/smiley/smiley_PNG113.png')
                .setDescription("Trop tard, quelqu'un a été plus rapide que vous !")
                .setColor(0xFF0000);
            message.channel.send(embed);
            return;
        }

        //Si c'est la bonne réponse
        if (answer.toUpperCase() === quizz.question[quizz.game.questionToAnswer.currentQuestion].reponse.toUpperCase()) {
            // indication que la question a déja été répondu
            quizz.game.questionToAnswer.answered = true;

            // mise à jour du score du joueur
            if (!quizz.score[message.author.id]) {
                quizz.score[message.author.id] = 1;
            } else {
                quizz.score[message.author.id] = quizz.score[message.author.id] + 1;
            }         
            embed.setTitle("Félicitations!")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Bien joué , la réponse était en effet : " + quizz.question[quizz.game.questionToAnswer.currentQuestion].reponse +
                    "\n Votre score est maintenant : " + quizz.score[message.author.id])
                .setColor(0x00FF00);
            message.channel.send(embed);
        }else{
            embed.setTitle("Mauvaise réponse !")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Indice : "+quizz.question[quizz.game.questionToAnswer.currentQuestion].reponse[0]+"...")
                .setColor(0xFF0000);
            message.channel.send(embed);
        }
    }
};