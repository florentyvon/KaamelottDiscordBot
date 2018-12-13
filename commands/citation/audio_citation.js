const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');

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
            /*args: [{
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
            ]*/
        });
    }

    // activated when "!run" is send in channel
    /*
     * WARNING : Node support async method but must specify " --harmony " when run the app
     * so it become : node --harmony . 
     */
    async run(message, { filter, value }) { //args are parameter after name command

        /*var api = 'https://kaamelott.chaudie.re/api';
        switch (filter) {
            case "-l":
                api = api.concat("/random/livre/" + value);
                break;
            case "-a":
                api = api.concat("/random/personnage/" + value);
                break;
            default:
                api = api.concat("/random");
                break;
        }

        fetch(api)
            .then(res => res.json())
            .then(function(json) {
                message.reply(CitationToString(json));
            })
            .catch((err) => console.log(err + ' failed ' + filter)); */
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("MESSAGE IF NOT IN A VOICE CHANNEL")
        VC.join()
            .then(connection => {
                const dispatcher = connection.playFile('C:/Users/Florent YVON/Documents/projects/KaamelottDiscordBot/sounds/a_roulettes.mp3');
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