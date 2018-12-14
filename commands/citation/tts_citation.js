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
                'ttscitation -p @nomPersonnage (filtre sur le personnage)',
                'ttscitation -l @numeroDeLivre (1 à 6) -p @nomDuPersonnage'
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
        let api = 'https://kaamelott.chaudie.re/api/random';
        if(dict['l']) api = api.concat("/livre/" + dict['l']);
        if(dict['p']) api = api.concat("/personnage/" + dict['p']);

        fetch(api)
            .then(res => res.json())
            .then(function(json) {
                message.channel.send(CitationToString(json),{tts: true});
            })
            .catch((err) => console.log(err + ' failed ' + filter));
    }
};

function CitationToString(json) {
    return json.citation.citation + " comme " + json.citation.infos.personnage + " dans l'épisode "+json.citation.infos.episode+", du "+json.citation.infos.saison;
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