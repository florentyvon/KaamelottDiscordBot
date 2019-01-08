const commando = require('discord.js-commando');
const insultes = require('./insults.json');
const discord = require('discord.js');

module.exports = class RandomInsulteCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'insultelist',
            group: 'insulte', 
            aliases:['il'], //permet que k!il conduise au même résultat que k!insultelist
            memberName: 'insultelist',
            description: 'Obtiens la liste des insultes possibles et leur id respectif', 
            examples: [ 'k!insultelist' ], // exemples d'utilisation
        }); 
    }

    async run(message) {
        let tosend = "insult_ID : insult_text\n";
        //on parcours le fichier d'insultes et on met en forme le message
        Object.keys(insultes).forEach(element => {
            tosend += element + " : " + insultes[element]['text'] + "\n";
        });
        tosend += 'Essaye k!insulte @user insult_ID ou k!audioinsulte @user insult_ID'
        //on previent l'auteur, qu'on lui a envoyé un message privé
        let embed = new discord.RichEmbed();
        embed
        .setAuthor(message.author.username,message.author.avatarURL)
        .setDescription('Je vous ai envoyé un message privé')
        .setColor(0x00ae86);
        //Envoi du message d'informations puis du message privé
        message.channel.send(embed);
        message.author.send(tosend);
    }
};