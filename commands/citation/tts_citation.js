const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');
const utils = require('../../Utilities/Utility');

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
                'ttscitation [--p <nomPersonnage>] [--l <numeroDeLivre>(1-6)]'
            ]
        });
    }

    async run(message){ //Message contient le message entier ayant lancé la commande (préfixe et commande suivis des arguments)
        let dict = utils.ParseArgs(message.argString); //Parse les arguments de la commande (message.argString contient uniquement les arguments)
        let api = 'https://kaamelott.chaudie.re/api/random'; //adresse de l'api où sont stockées les quotes
        if(dict['l']) api = api.concat("/livre/" + dict['l']); //filtrage sur le livre
        if(dict['p']) api = api.concat("/personnage/" + dict['p']); //filtrage sur le personnage

        //Appel de l'api
        fetch(api)
            .then(res => res.json())
            .then(function(json) {
                //création du message de sortie, pas de message embed possible en tts
                message.channel.send(CitationToString(json),{tts: true});
            })
            .catch((err) => {
                console.log(err + ' failed ');
                //Si l'appel a échoué, renvoie une erreur
                let embed = new discord.RichEmbed();
                embed
                .setTitle("Erreur !")
                .setDescription("Aucune citation n'a été trouvée !")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setColor(0xFF0000);
                return message.channel.send(embed);
            });
    }
};
//formate une citation pour afficher la citation, son auteur et l'épisode concerné
function CitationToString(json) {
    return json.citation.citation + " comme disait " + json.citation.infos.personnage + " dans l'épisode "+json.citation.infos.episode+", du "+json.citation.infos.saison;
};