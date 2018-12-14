const { Command } = require('discord.js-commando');
const quizz = require('../quizz/quizz.json');
const fetch = require('node-fetch');
const discord = require('discord.js');

module.exports = class StartCommand extends Command {
    constructor(client) {
        // Only set client + CommandInfo
        super(client, {
            name: 'start',
            group: 'quizz',
            memberName: 'start',
            description: 'Start a quizz',
            examples: ['k!start 1', 'Result :', 'You have started a 1 question quiz'], // string array with different using  (Not Necessary)
            args: [
                {
                    key: 'int',
                    prompt: 'How many question do you want? ',
                    type: 'integer',
                    validate: int => {
                        if (int >= 1 && int <= 20) return true;
                        return 'Must be between 1 and 20 to start';
                    }
                }
            ]
        });
    }

    async run(message, { int }) {
        if (quizz.game.isOn) {  //not 2 games in parallel
            message.channel.send("```Game is already started.```");
            return;
        }

        var self = this;
        var api = 'https://kaamelott.chaudie.re/api/random';
        let i = 1
        for (i; i <= int; i++) {
            await fetch(api)
                .then(res => res.json())
                .then(function (json) {
                    quizz.question.push({ "citation": json.citation.citation, "reponse": json.citation.infos.personnage });
                })
                .catch((err) => console.log(err + ' failed ' + filter));
        }

        var embed = new discord.RichEmbed()
            .setTitle("Game Starting")
            .setThumbnail('https://i.imgur.com/P2HEOcH.png')
            .setDescription("You have started a " + int + " question(s) quiz. It will begin in 10s and you have the same time to answer each question.")
            .setColor(0x33ccff);
        message.channel.send(embed);

        quizz.game.isOn = true;
        quizz.game.numberOfQuestion = int;
        new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 10000)
        })
            .then(async function () {
                for (let j in quizz.question) {
                    quizz.game.questionToAnswer.currentQuestion++;
                    quizz.game.questionToAnswer.answered = false;
                    let embed = new discord.RichEmbed()
                        .setTitle("Question n°" + j)
                        .setDescription("who said:\n" + quizz.question[j].citation + quizz.question[j].reponse)
                        .setColor(0x33ccff);
                    message.channel.send(embed);
                    let promise = new Promise((resolve, reject) => {
                        setTimeout(() => resolve("done!"), 10000)
                    });
                    await promise; // wait till the promise resolves
                }
                self.endGame(message);
            })
            .catch(function (error) { console.log(error) });
    }

    resetJson() {
        quizz.game.isOn = false;
        quizz.game.numberOfQuestion = 0;
        quizz.game.questionToAnswer.currentQuestion = -1;
        quizz.game.questionToAnswer.answered = false;
        quizz.question = [];
        quizz.score = [];
    }

    displayFinalScore(messageInstance) {
        var embed = new discord.RichEmbed();

        if (Object.keys(quizz.score).length <= 0) {
            embed.setTitle("Big deception")
                .setDescription("No one participate so no one win!")
                .setColor(0xFF0000);
            messageInstance.channel.send(embed);
            return;
        }

        let scores = quizz.score.sort(function (x, y) {
            return x > y ? 1 : x < y ? 0 : -1
        });

        var placeCounter = 1;
        embed.setTitle("Final Scores")
            .setColor(0x00FF00)
            .setThumbnail('https://i.imgur.com/P2HEOcH.png');

        for (let k in scores) {
            var user = messageInstance.client.users.get(k);
            embed.addField(placeCounter++ + ".", user + " (score : " + quizz.score[k] + ")");
        }
        messageInstance.channel.send(embed);
    }

    endGame(messageInstance) {

        this.displayFinalScore(messageInstance)
        this.resetJson();
    }
};