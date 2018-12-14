const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');
const discord = require('discord.js');
const image = require('./ImagePersonnage.json')

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
                'citation -p @nomPersonnage (filtre sur le personnage)'
            ]
        });
    }

    async run(message){ 
        let dict = ParseArgs(message.argString); //parsing the arguments
        let api = 'https://kaamelott.chaudie.re/api/random';
        if(dict['l']) api = api.concat("/livre/" + dict['l']);
        if(dict['p']) api = api.concat("/personnage/" + dict['p']);

        fetch(api)
            .then(res => res.json())
            .then(function(json) {
                let embed = new discord.RichEmbed();
                embed
                .setAuthor(message.author.username,message.author.avatarURL)
                .setThumbnail(image[json.citation.infos.personnage])
                .setDescription(CitationToString(json))
                .setColor(0x00ae86);
                message.channel.send(embed);
            })
            .catch((err) => console.log(err + ' failed '));
    }
};

function CitationToString(json) {
    return "\" " + json.citation.citation +
        " \"\nPersonnage : " + json.citation.infos.personnage +
        "\n" + json.citation.infos.saison +
        "\nEpisode : " + json.citation.infos.episode;
};

function ParseArgs(message){
    if(message==="") return {};
    let args = message.trim().slice(1).split('-');
    args.forEach(element => {
        element.trim();
    });
    let dict = {};
    args.map(item =>{ let [k,v] = item.split(' '); 
                dict[k] = v;})
    return dict;
}