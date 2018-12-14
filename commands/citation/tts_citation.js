const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class RandomCitationCommand extends Command {
    constructor(client) {
        // Only set client + CommandInfo
        super(client, {
            name: 'ttscitation',
            group: 'citation',
            aliases: ['tc'],
            memberName: 'ttscitation',
            description: 'Renvoi une citation aléatoire en tts.',
            examples: [
                'ttscitation (aucun filtre)',
                'ttscitation -l @numeroDeLivre (filtre sur un livre compris entre 1 et 6)',
                'ttscitation -p @nomPersonnage (filtre sur le personnage)'
            ]
        });
    }

    // activated when "!run" is send in channel
    /*
     * WARNING : Node support async method but must specify " --harmony " when run the app
     * so it become : node --harmony . 
     */
    async run(message, { filter, value }) { //args are parameter after name command
        let dict = ParseArgs(message.argString); //parsing the arguments
        var api = 'https://kaamelott.chaudie.re/api/random';
        if(dict['l']) api = api.concat("/livre/" + dict['l']);
        if(dict['p']) api = api.concat("/personnage/" + dict['p']);

        fetch(api)
            .then(res => res.json())
            .then(function(json) {
                message.reply(CitationToString(json),{tts: true});
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
    if(message==="") return {};
    let args = message.trim().slice(1).split('-');
    args.forEach(element => {
        element.trim();
    });
    console.log(message);
    console.log(args);
    let dict = {};
    args.map(item =>{ var [k,v] = item.split(' '); 
                dict[k] = v;})
    console.log(dict)
    return dict;
}