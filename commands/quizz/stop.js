const { Command } = require('discord.js-commando');
const quizz = require('../quizz/quizz.json');
const discord = require('discord.js')

module.exports = class StopCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'quizz',
            memberName: 'stop',
            description: 'Arrête un quiz en cours si la majorité est d\'accord',
            examples: ['k!stop', 'Resultat :', 'Voulez-vous arreter ce quiz? \n Réagir pour voter'],
        });
    }

    async run(message) {  
        let embed = new discord.RichEmbed();//Création de l'instance du EmbedMessage

        //Si le jeu n'a pas commencé
        if(!quizz.game.isOn) { 
            embed.setTitle("Erreur Commande")
                 .setDescription(message.author + "Le jeu n'est pas commencé.")
                 .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                 .setColor(0xFF0000);
            message.channel.send(embed)
            return; 
        }

        //Affichage du message pour votez
        embed.setTitle("Fin du jeu")
             .setDescription("Voulez-vous arrêter ce quiz? \n👍 / 👎\nFin dans 15 secondes")
             .setColor(0x0000FF);
        let msg = await message.channel.send(embed);
        await msg.react("👍");
        await msg.react("👎");
        
        //15s apres l'affichage du message , on contabilise les votes
        const reactions = await msg.awaitReactions(react=>react.emoji.name==="👍" || react.emoji.name=== "👎" , {time: 15000})

        //Fin du jeu
        if(reactions.get("👍").count >= reactions.get("👎").count){
            quizz.game.isOn=false;
            embed.setTitle("Fin du jeu !")
                 .setDescription("La démocratie a parlé, le jeu est fini !")
                 .setColor(0x0000FF);
            message.channel.send(embed);
        }else{
            //le jeu continue
            embed.setTitle("Le jeu continue !")
                 .setDescription("Vous pensiez que le jeu était fini ? Et Nooon! Le jeu continue !")
                 .setColor(0x0000FF);
            message.channel.send(embed);            
        }
    }
};