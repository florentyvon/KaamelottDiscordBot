const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class RandomCitationCommand extends Command {
    constructor(client) {
        // Only set client + CommandInfo
        super(client, {
            name: 'citation',
            group: 'citation',
            memberName: 'citation',
            description: 'Renvoi une citation aléatoire.',
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

    async run(message, {filter, value}){  //args are parameter after name command
        
        var api = 'https://kaamelott.chaudie.re/api';
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
            .catch((err) => console.log(err + ' failed ' + filter));
    }
};

function CitationToString(json) {
    return "\" " + json.citation.citation +
        " \"\nPersonnage : " + json.citation.infos.personnage +
        "\n" + json.citation.infos.saison +
        "\nEpisode : " + json.citation.infos.episode;
};