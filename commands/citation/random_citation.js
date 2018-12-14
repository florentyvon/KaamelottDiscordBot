const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class RandomCitationCommand extends Command {
    constructor(client) {
        // Only set client + CommandInfo
        super(client, {
            name: 'citation',
            group: 'citation',
            aliases: ['c'],
            memberName: 'citation',
            description: 'Renvoi une citation aléatoire.',
            examples: [
                'citation (aucun filtre)',
                'citation -l @numeroDeLivre (filtre sur un livre compris entre 1 et 6)',
                'citation -a @nomPersonnage (filtre sur le personnage)'
            ]
        });
    }

    async run(message){ 
        let dict = ParseArgs(message); //parsing the arguments
        var api = 'https://kaamelott.chaudie.re/api/random';
        if(dict['l']) api = api.concat("/livre/" + value);
        if(dict['a']) api = api.concat("/personnage/" + value);
        

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

function ParseArgs(message){
    const args = message.content.slice(prefix.length).split('-').trim();
    const command = args.shift().toLowerCase();
    let dict = {};
    args.map(item =>{ var [k,v] = item.split(' '); 
                if(dict[k]) return false;
                dict[k] = v;})
    return dict;
}