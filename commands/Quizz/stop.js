const { Command } = require('discord.js-commando');
const quizz = require('../quizz/quizz.json');
const discord = require('discord.js')

module.exports = class StopCommand extends Command {
    constructor(client) {
        // Only set client + CommandInfo
        super(client, {
            name: 'stop',
            group: 'quizz',
            memberName: 'stop',
            description: 'stop a quizz',
            examples: ['k!stop', 'Result :', 'Voulez-cous arreter ce quiz? \n Réagir pour voter'], // string array with different using  (Not Necessary)
        });
    }

    async run(message) {  
        let embed = new discord.RichEmbed();//Création de l'instance du EmbedMessage

        //Si le jeu n'a pas commencé
        if(!quizz.game.isOn) { 
            embed.setTitle("Erreur Commande")
                 .setDescription(message.author + "Le jeu n'est pas commencé.")
                 .setColor(0xFF0000);
            message.channel.send(embed)
            return; 
        }

        //Affichage du message pour votez
        embed.setTitle("Fin du jeu")
             .setDescription("Voulez-cous arreter ce quiz? \n👍 / 👎\nFin dans 15 secondes")
             .setColor(0x0000FF);
        let msg = await message.channel.send(embed);
        await msg.react("👍");
        await msg.react("👎");
        
        //15s apres l'affichage du message , on contabilise les votes
        const reactions = await msg.awaitReactions(react=>react.emoji.name==="👍" || react.emoji.name=== "👎" , {time: 15000})

        //Fin du jeu
        if(reactions.get("👍").count >= reactions.get("👎").count){
            quizz.game.isOn=false;
            embed.setTitle("Fin du jeu End")
                 .setDescription("La démocratie à parler, le jeu est fini !")
                 .setColor(0x0000FF);
            message.channel.send(embed);
        }else{
            //le jeu continu
            embed.setTitle("Le jeu continu")
                 .setDescription("Vous pensiez que le jeu était fini ? Et Nooon! Le jeu continu !")
                 .setColor(0x0000FF);
            message.channel.send(embed);            
        }
    }
};