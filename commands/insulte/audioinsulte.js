const commando = require('discord.js-commando');
const insultes = require('./insults.json');
const path = require('path');
const discord = require('discord.js');

module.exports = class RandomAudioInsulteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'audioinsulte',
            group: 'insulte',
            memberName: 'audioinsulte',
            description: 'Insulte quelqu\'un',
            aliases: ['ai'],
            examples: ['audioinsulte <@user> [id]', 'Utilisez k!insulteliste pour obtenir la liste des ID.'], 
            args: [
                {
                    key: 'user',
                    prompt: 'Qui voulez-vous insulter ?',//si on ne précise pas de cible, en demande une
                    type: 'user',
                },
                {
                    key: 'id',
                    prompt: 'unused',
                    type: 'integer',
                    default: 0
                }
            ]
        });
    }

    async run(message, { user, id }) {
        if(id === 0){//Si aucun id n'a été envoyé, en sélectionne un aléatoire
            let nb = Object.keys(insultes).length;
            id = Math.floor(Math.random() * nb) + 1;
        }
        if(id > nb || id < 0){
            let embed = new discord.RichEmbed();
            embed
                .setTitle('Erreur !')
                .setDescription("Insulte choisie inexistante")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setColor(0xFF0000);
            return message.channel.send(embed);
        }
        let VCm = message.member.voiceChannel;//le chat vocal de l'utilisateur
        let soundsPath = "";//Variable qui permettra de jouer le son voulu
        let pathArray = [];//Tableau qui contiendra la suite des répertoires du chemin actuel
        let toplay = [];//liste des insultes
        let pathName = __dirname;//Chemin vers le dossier actuel
        let BreakException = {};//permet de sortir de la boucle for

        //renvoie une erreur si l'utilisateur n'est pas dans un chat vocal
        if(typeof Vcm == "undefined"){
            let embed = new discord.RichEmbed();
            embed
                .setTitle('Erreur !')
                .setDescription("Rejoins un chat vocal d'abord !")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setColor(0xFF0000);
            return message.channel.send(embed);
        }

        //renvoie une erreur si la cible ne peut pas entendre
        if(!VCm.members.has(user.id)){
            let embed = new discord.RichEmbed();
            embed
                .setTitle('Erreur !')
                .setDescription("Tu dois être dans le même chat vocal que ta cible !")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setColor(0xFF0000);
            return message.channel.send(embed);
        }

        //Récupération du chemin vers les fichiers sons
        pathArray = pathName.split(path.sep);
        if (pathArray[pathArray.length - 1] === "insulte" && pathArray[pathArray.length - 2] === "commands") {
            try {
                pathArray.forEach(function (element) {
                    if (element === "commands") {
                        throw BreakException;
                    }
                    soundsPath += element + path.sep;
                });
            } catch (e) {
                if (e !== BreakException) throw e;
            }
            soundsPath += "sounds" + path.sep;
        }
        
        //récupère les insultes
        toplay = insultes;

        //lis l'insulte dans le chat vocal
        VCm.join()
            .then(connection => {
                const dispatcher = connection.playFile(soundsPath + toplay[id]['audio']);
                dispatcher.on("end", end => { VCm.leave() });
            })
            .catch(console.error);
        
        //supprime le message afin de cacher qui a lancé l'insulte
        message.delete();
    }
};