const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');
const discord = require('discord.js');
const image = require('./ImagePersonnage.json')
const utils = require('../../Utilities/Utility');

module.exports = class RandomCitationCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'citation',
            group: 'citation',
            aliases: ['c'],
            memberName: 'citation',
            description: 'Renvoi une citation aléatoire.',
            examples: [
                'citation [--p <nom de Personnage>] [--l <numero de Livre (1-6)>]'
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
                //création du message de sortie
                let embed = new discord.RichEmbed();
                embed
                .setAuthor(message.author.username,message.author.avatarURL)
                .setThumbnail(image[json.citation.infos.personnage]) //On affiche une image du personnage stockée en local
                .setDescription(CitationToString(json)) //Version écrite de la citation
                .setColor(0x00ae86);
                message.channel.send(embed);
            })
            .catch((err) => {
                //console.log(err + ' failed ');
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
    return "\" " + json.citation.citation +
        " \"\nPersonnage : " + json.citation.infos.personnage +
        "\n" + json.citation.infos.saison +
        "\nEpisode : " + json.citation.infos.episode;
};