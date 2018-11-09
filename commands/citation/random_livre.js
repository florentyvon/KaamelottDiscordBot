const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class RandomLivreCitationCommand extends Command{
    constructor(client){
        // Only set client + CommandInfo
        super(client, {
            name: 'citationcqnlswv',
            group: 'citation', 
            memberName: 'citation_livre',
            description: 'Get random citation', 
            examples: [ 'citation -l 1' ],
            args: [
                {
                    key: 'mainParam',
                    prompt: 'Filtrer par les livres',
                    type: 'string',
                    valide: mainParam => {
                        if (mainParam === "-l") return true;
                        return 'paramètre erroné';
                    }
                },
                {
                    key: 'int',
                    prompt: 'Parmi quel livre souhaitez-vous obtenir une citation?',
                    type: 'integer',
                    valide: int => {
                        if (int >= 1 && int <= 6) return true;
                        return 'Il n\'y a que 6 livres bougre d\'idiot';
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
    async run(message, {int}){  //args are parameter after name command
        fetch('https://kaamelott.chaudie.re/api/random/livre' + int)
        .then(res => res.json())
        .then(function(json){
            message.reply(json.citation.citation + json.citation.infos.saison);
            console.log(json);
        });
    }
};