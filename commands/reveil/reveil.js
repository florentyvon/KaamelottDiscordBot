const { Command } = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class Reveil extends Command {
    constructor(client) {
        super(client, {
            name: 'reveil',
            group: 'reveil',
            aliases: ['r'],
            memberName: 'reveil',
            description: 'Réveille un chat vocal avec un "coup de tintouin"',
            examples: [ 'k!reveil' ]
        });
    }

    
    async run(message) { //Message contient le message entier ayant lancé la commande (préfixe et commande suivis des arguments
        let VC = message.member.voiceChannel; //chat vocal de l'auteur de la commande 
        if (!VC){ // L'utilisateur n'est pas dans un chat vocal : renvoie une erreur
            let embed = new discord.RichEmbed();
                embed
                .setTitle("Erreur !")
                .setDescription("Vous devez être connecté à un chat vocal d'abord !")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setColor(0xFF0000);
            return message.channel.send(embed); //on affiche l'erreur sur le channel
        }

        //Le bot se connecte au chat vocal de l'utilisateur
        VC.join()
            .then(connection => {
                //joue le fichier son du réveil
                const dispatcher = connection.playFile("./commands/reveil/reveil.mp3");
                //quitte le chat vocal quand la lecture est terminée
                dispatcher.on("end", end => { VC.leave() }); //on déconnecte le bot du chat vocal une fois le message terminé
            })
            .catch(console.error)
    }
};