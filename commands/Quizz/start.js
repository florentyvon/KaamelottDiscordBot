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
            examples: ['k!start 1',
             'Result :', 
             'Vous avez commencez un quiz de 1 question(s)'],
            //La commande nécessite un nombre de question.
            args: [
                {
                    key: 'int',
                    prompt: 'Combien voulez-vous de questions? ',
                    type: 'integer',
                    validate: int => {
                        if (int >= 1 && int <= 20) return true;
                        return 'Le nombre de question doit être entre 1 et 20';
                    }
                }
            ]
        });
    }

    async run(message, { int }) {
        if (quizz.game.isOn) {  //Pas 2 jeux en parallèle
            message.channel.send("```Une partie est déjà en cours.```");
            return;
        }

        let self = this;//Récupération du contexte générale
        let api = 'https://kaamelott.chaudie.re/api/random'; //URL de l'api
        let i = 1
        //Chargement des questions pour le quiz
        for (i; i <= int; i++) {
            await fetch(api)
                .then(res => res.json())
                .then(function (json) {
                    quizz.question.push({ "citation": json.citation.citation, "reponse": json.citation.infos.personnage });
                })
                .catch((err) => console.log(err + ' failed ' + filter));
        }

        //Affichage du lancement du jeu
        let embed = new discord.RichEmbed()
            .setTitle("Lancement du jeu")
            .setThumbnail('https://i.imgur.com/P2HEOcH.png')
            .setDescription("Vous avez commencez un quiz de" + int + "question(s). Il commencera dans 30 secondes et le temps entre les question sera le même.")
            .setColor(0x33ccff);
        message.channel.send(embed);

        //initialisation des données du jeu
        quizz.game.isOn = true;
        quizz.game.numberOfQuestion = int;
        //attente de 30 secondes avant le lancement du jeux
        new Promise((resolve, reject) => {
            setTimeout(() => resolve("Fait!"), 30000)
        })
        //Après 30s le jeux commence
            .then(async function () {
                for (let j in quizz.question) {
                    quizz.game.questionToAnswer.currentQuestion++;
                    quizz.game.questionToAnswer.answered = false;
                    let embed = new discord.RichEmbed()
                        .setTitle("Question n°" + j)
                        .setDescription("Qui à dit:\n" + quizz.question[j].citation)
                        .setColor(0x33ccff);
                    message.channel.send(embed);
                    //On attend 30s pour lancer la question suivante
                    let promise = new Promise((resolve, reject) => {
                        setTimeout(() => resolve("Fait!"), 30000)
                    });
                    await promise; // On attend le resolve
                }
                self.endGame(message);//fin du jeu
            })
            .catch(function (error) { console.log(error) });
    }


    //reset des données du jeu
    resetJson() {
        quizz.game.isOn = false;
        quizz.game.numberOfQuestion = 0;
        quizz.game.questionToAnswer.currentQuestion = -1;
        quizz.game.questionToAnswer.answered = false;
        quizz.question = [];
        quizz.score = [];
    }

    //affichage du score final
    displayFinalScore(messageInstance) {
        let embed = new discord.RichEmbed();

        //si personne n'a joué
        if (Object.keys(quizz.score).length <= 0) {
            embed.setTitle("Grosse déception")
                .setDescription("Personne n'a participé donc personne ne gagne!")
                .setColor(0xFF0000);
            messageInstance.channel.send(embed);
            return;
        }

        //classement de score
        let scores = quizz.score.sort(function (x, y) {
            return x > y ? 1 : x < y ? 0 : -1
        });

        //affichage du score
        let placeCounter = 1;
        embed.setTitle("Scores")
            .setColor(0x00FF00)
            .setThumbnail('https://i.imgur.com/P2HEOcH.png');

        for (let k in scores) {
            let user = messageInstance.client.users.get(k);
            embed.addField(placeCounter++ + ".", user + " (score : " + quizz.score[k] + ")");
        }
        messageInstance.channel.send(embed);
    }

    //On affiche le score puis le reset des données
    endGame(messageInstance) {

        this.displayFinalScore(messageInstance)
        this.resetJson();
    }
};