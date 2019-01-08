const { Command } = require('discord.js-commando');
const quizz = require('../quizz/quizz.json');
const fetch = require('node-fetch');
const discord = require('discord.js');

module.exports = class StartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'start',
            group: 'quizz',
            memberName: 'start',
            description: 'Start a quizz',
            examples: ['k!start 1',
                'Resultat :',
                'Vous avez commencez un quiz de 1 question(s)'],
            //La commande nécessite un certain nombre de question.
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
            //Affichage de l'erreur : un jeu est déjà en cours
            let embed = new discord.RichEmbed()
                .setTitle("Erreur Commande")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setDescription("Un jeu est déjà en cours")
                .setColor(0xFF0000);
            message.channel.send(embed);
            //message.channel.send("```Une partie est déjà en cours.```");
            return;
        }

        let self = this;//Récupération du contexte général
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
            .setDescription("Vous avez commencé un quiz de " + int + " question(s). Il commencera dans 30 secondes et le temps entre les questions sera de même.")
            .setColor(0x33ccff);
        message.channel.send(embed);

        //initialisation des données du jeu
        quizz.game.isOn = true;
        quizz.game.numberOfQuestion = int;
        //attente de 15 secondes avant le lancement du jeu
        new Promise((resolve, reject) => {
            setTimeout(() => resolve("Fait!"), 15000)
        })
            //Après 15s le jeu commence
            .then(async function () {
                for (let j in quizz.question) {
                    var n = parseInt(j) + 1;
                    quizz.game.questionToAnswer.currentQuestion++;
                    quizz.game.questionToAnswer.answered = false;
                    let embed = new discord.RichEmbed()
                        .setTitle("Question n° " + n)
                        .setDescription("Qui a dit :\n" + quizz.question[j].citation)
                        .setColor(0x33ccff);
                    message.channel.send(embed);
                    //On attend 15s pour lancer la question suivante
                    let promise = new Promise((resolve, reject) => {
                        setTimeout(() => resolve("Fait!"), 15000)
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
        embed.setTitle("Fin du Jeu");

        //si personne n'a joué
        if (Object.keys(quizz.score).length <= 0) {
            embed.setDescription("Personne n'a participé donc personne ne gagne!")
                .setThumbnail('https://pngimg.com/uploads/smiley/smiley_PNG113.png')
                .setColor(0x0000FF);
            messageInstance.channel.send(embed);
            return;
        }

        //classement de scores
        let scores = quizz.score.sort(function (x, y) {
            return x > y ? 1 : x < y ? 0 : -1
        });

        //affichage du score
        let placeCounter = 1;
        embed.setColor(0x0000FF)
            .setThumbnail('https://i.imgur.com/P2HEOcH.png')
            .setDescription("Scores");
        //tableau des scores
        for (let k in scores) {
            let user = messageInstance.client.users.get(k);
            embed.addField(placeCounter++ + ". " + user.username,"(score : " + quizz.score[k] + ")");
        }
        messageInstance.channel.send(embed);
    }

    //On affiche le score puis on efface les données
    endGame(messageInstance) {

        this.displayFinalScore(messageInstance)
        this.resetJson();
    }
};