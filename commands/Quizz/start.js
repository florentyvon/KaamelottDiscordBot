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
        let i = 1
        for (i; i <= int; i++) {
            await fetch(api)
                .then(res => res.json())
                .then(function (json) {
                    quizz.question.push({ "citation": json.citation.citation, "reponse": json.citation.infos.personnage });
                })
                .catch((err) => console.log(err + ' failed ' + filter));

        }

        message.reply("You have started a " + int + " question(s) quiz. It will begin in 30s");
        quizz.game.isOn = true;
        quizz.game.numberOfQuestion = int;

        for (let j in quizz.question) {
            if (quizz.game.isOn) {     
                
                let promise = new Promise((resolve, reject) => {
                    setTimeout(() => resolve("done!"), 30000)
                  });                  
                  let result = await promise; // wait till the promise resolves
                  quizz.game.currentQuestion++;
                  message.channel.send("Question n°" + j  + "\nwho said:\n" + quizz.question[j].citation);
                  message.channel.send(quizz.question[j].reponse);//To allow test

            }
        }
        quizz.game.isOn = false;
        resetJson();
    }
};

function resetJson() {
    quizz={
        "game":{
            "isOn":false,
            "numberOfQuestion": 0,
            "currentQuestion": -1
        },
        "question":[],
        "score":[]
    
    };
}