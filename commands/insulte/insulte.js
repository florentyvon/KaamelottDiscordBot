const commando = require('discord.js-commando');
const insultes = require('./insults.json');
const discord = require('discord.js');

module.exports = class RandomInsulteCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'insulte',
            group: 'insulte', 
            memberName: 'insulte',
            description: 'Envoyer une insulte à quelqu\'un', 
            aliases:['i'], //permet que k!i conduise au même résultat que k!insulte
            examples: [ 'k!insulte @user', 'k!insulte @user insult_id', 'Essaye k!insultelist pour connaître tous les ID' ], // exemples d'utilisation
            args: [
                {
                    //Utilisateur qu'il faut insulter
                    key: 'user',
                    prompt: 'Qui veux-tu insulter ? Taggue le/la', //Si pas précisé dès le début, question posée
                    type: 'user',
                },
                {
                    //Insulte que l'utilisateur souhaite envoyer
                    key : 'id',
                    prompt : 'Veux-tu envoyer une insulte particulière ? Entre son id (k!insultelist ou k!il pour connaître tous les id)',
                    type : 'integer',
                    default : 0
                }
            ]
        }); 
    }

    async run(message, { user, id }) {
        let nb = Object.keys(insultes).length;
        if(id === 0){//Si aucun id n'a été envoyé, en sélectionne un aléatoire
            id = Math.floor(Math.random() * nb) + 1;
        }
        //Vérification que l'insulte envoyée existe
        if(id > nb || id <= 0){
            let embed = new discord.RichEmbed();
            embed
                .setTitle('Erreur !')
                .setDescription("Insulte choisie inexistante")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setColor(0xFF0000);
            return message.channel.send(embed); //on retourne un message d'erreur sinon
        }
        message.delete(); //on supprime le message pour que la personne insultée ne sache pas qui l'a taggué
        //Si l'utilisateur taggue le bot, il est pris à son propre jeu et se fait insulter lui-même sinon son insulte est envoyée
		if(user.id === '507258744309022721'){
			return message.reply(insultes[id]['text']);
		}else{
			return message.channel.send(user+', '+insultes[id]['text']);
		}		
    }
};