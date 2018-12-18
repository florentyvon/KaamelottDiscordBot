const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class RandominsultCommand extends Command {
    constructor(client) {
        let nb = Object.keys(insultes).length;
        let mess = Math.floor(Math.random() * nb)+1;
        // Only set client + CommandInfo
        super(client, {
            name: 'ttsinsult',
            group: 'insult',
            aliases: ['ti'],
            memberName: 'ttsinsult',
            description: 'Renvoi une insult aléatoire en tts.',
            examples: [
                'ttsinsult (aucun filtre)',
                'ttsinsult -l @numeroDeLivre (filtre sur un livre compris entre 1 et 6)',
                'ttsinsult -p @nomPersonnage (filtre sur le personnage)',
                'ttsinsult -l @numeroDeLivre (1 à 6) -p @nomDuPersonnage'
            ],
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to insult ? ',
                    type: 'user',
                },
                {
                    key : 'id',
                    prompt : 'Do you want to send a precise insult ?',
                    type : 'integer',
                    default : mess
                }
            ]
        });
    }

    // activated when "!run" is send in channel
    /*
     * WARNING : Node support async method but must specify " --harmony " when run the app
     * so it become : node --harmony . 
     */
    async run(message, { filter, value }) { //args are parameter after name command
        message.delete();
        if (user.id === '507258744309022721') {
            message.reply(insultes[id]['text'],{tts: true});
        } else {
            message.channel.send(user + ', ' + insultes[id]['text'],{tts: true});
        }
    }
};