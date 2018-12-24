const { Command } = require('discord.js-commando');
const discord = require('discord.js');

module.exports = class ReveilRandom extends Command {
    constructor(client) {
        super(client, {
            name: 'reveil',
            group: 'reveil',
            aliases: ['r'],
            memberName: 'reveil',
            description: 'Réveille un chat vocal avec un "coup de tintouin"',
            examples: [ 'reveil' ]
        });
    }

    
    async run(message) { //Message contient le message entier ayant lancé la commande (préfixe et commande suivis des arguments
        let VC = message.member.voiceChannel; //chat vocal de l'auteur de la commande 

        if (!VC){ // L'utilisateur n'est pas dans un chat vocal : renvoie une erreur
            let embed = new discord.RichEmbed();
                embed
                .setTitle("Erreur !")
                .setDescription("Vous devez être connecté à un chat vocal d'abord !")
                .setColor(0x00ae86);
            return message.channel.send(embed);
        }

        //Le bot se connecte au chat vocal de l'utilisateur
        VC.join()
            .then(connection => {
                //joue le fichier son aléatoire
                console.log("jouer reveil");
                const dispatcher = connection.playFile("./commands/reveil/reveil.mp3");
                //quitte le chat vocal quand la lecture est terminée
                dispatcher.on("end", end => { VC.leave() });
            })
            .catch(console.error)
    }
};