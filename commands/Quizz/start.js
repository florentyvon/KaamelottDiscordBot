const { Command } = require('discord.js-commando');
const quizz = require('../quizz/quizz.json');
const fetch = require('node-fetch');

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

    // activated when "!run" is send in channel
    /*
    * WARNING : Node support async method but must specify " --harmony " when run the app
    * so it become : node --harmony . 
    */
    async run(message, { int }) {  //args are parameter after name command

        var api = 'https://kaamelott.chaudie.re/api/random';

        for (var i = 0; i < int; i++) {
            fetch(api)
                .then(res => res.json())
                .then(function (json) {
                    quizz.question[i] = { "citation": json.citation.citation, "reponse": json.citation.infos.personnage };
                })
                .catch((err) => console.log(err + ' failed ' + filter));
        }

        message.reply("You have started a " + int + " question(s) quiz. It will begin in 30s");
        let j = 0
        quizz.game.isOn = true;
        for (j; j < int; j++) {
            if (quizz.game.isOn) {
                 setTimeout(function () {
                    message.channel.send("Question n°" + j + "\nwho said:\n" + quizz.question[j].citation);
                }, 3000);                
            }
        }
        quizz.game.isOn = false;
    }
};