const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');
const sounds = require('./sounds.json');

module.exports = class RandomCitationCommand extends Command {
    constructor(client) {
        // Only set client + CommandInfo
        super(client, {
            name: 'audiocitation',
            group: 'citation',
            memberName: 'audiocitation',
            description: 'Joue l\'audio d\'une citation au hasard',
            examples: [
                'citation (aucun filtre)',
                'citation -l @numeroDeLivre (filtre sur un livre compris entre 1 et 6)',
                'citation -a @nomPersonnage (filtre sur le personnage)'
            ],
            args: [{
                key: 'filter',
                prompt: 'Quel filtre souhaitez-vous? (-l pour livre ou -a pour auteur)',
                type: 'string',
                valide: filter => {
                    if (filter === '-l' || filter === '-a' || filter === '') return true;
                    return 'Filtre Erroné';
                }
            },
            {
                key: 'value',
                prompt: 'Parmi quel livre souhaitez-vous obtenir une citation?',
                type: 'string'
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
        let toplay = [];
        switch (filter) {
            case "-l":
                switch (value) {
                    case "1":
                        Object.keys(sounds).forEach(element => {
                            if (sounds[element]['book'] === 1) {
                                toplay.push(sounds[element]['file']);
                            }
                        });
                    case "2":
                        Object.keys(sounds).forEach(element => {
                            if (sounds[element]['book'] === 2) {
                                toplay.push(sounds[element]['file']);
                            }
                        });
                    case "3":
                        Object.keys(sounds).forEach(element => {
                            if (sounds[element]['book'] === 3) {
                                toplay.push(sounds[element]['file']);
                            }
                        });
                    case "4":
                        Object.keys(sounds).forEach(element => {
                            if (sounds[element]['book'] === 4) {
                                toplay.push(sounds[element]['file']);
                            }
                        });
                    case "5":
                        Object.keys(sounds).forEach(element => {
                            if (sounds[element]['book'] === 5) {
                                toplay.push(sounds[element]['file']);
                            }
                        });
                    case "6":
                        Object.keys(sounds).forEach(element => {
                            if (sounds[element]['book'] === 6) {
                                toplay.push(sounds[element]['file']);
                            }
                        });
                }
                break;
            case "-a":
                Object.keys(sounds).forEach(element => {
                    if (sounds[element]['character'].toLowerCase().includes(value.toLowerCase())) {
                        toplay.push(sounds[element]['file']);
                    }
                });
                break;
            default:
                Object.keys(sounds).forEach(element => {
                    var ind = Math.floor((Math.random()));
                    if(ind){
                        toplay.push(sounds[element]['file']);
                    }
                });
                break;
        }

        var ind = Math.floor((Math.random() * toplay.length));

        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
        VC.join()
            .then(connection => {
                const dispatcher = connection.playFile('C:/Users/Florent YVON/Documents/projects/KaamelottDiscordBot/sounds/' + toplay[ind]);
                dispatcher.on("end", end => { VC.leave() });
            })
            .catch(console.error)
    }
};

function CitationToString(json) {
    return "\" " + json.citation.citation +
        " \"\nPersonnage : " + json.citation.infos.personnage +
        "\n" + json.citation.infos.saison +
        "\nEpisode : " + json.citation.infos.episode;
}