const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');
const sounds = require('./sounds.json');
const path = require('path');
const discord = require('discord.js');
const utils = require('../../Utilities/Utility');

module.exports = class RandomAudioCitationCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'audiocitation',
            group: 'citation',
            aliases: ['ac'],
            memberName: 'audiocitation',
            description: 'Joue l\'audio d\'une citation au hasard',
            examples: [
                'audiocitation [--p <nom de Personnage>] [--l <numero de Livre (1-6)>]'
            ]
        });
    }

    
    async run(message) { //Message contient le message entier ayant lancé la commande (préfixe et commande suivis des arguments)
        let toplay = []; //Liste des citations correspondants aux arguments donnés
        let toplaytemp = []; //liste temporaire pour trier selon les arguments
        let pathArray = [];       //Tableau qui contiendra la suite des répertoires du chemin actuel
        let pathName = __dirname; //Chemin vers le dossier actuel
        let soundsPath = "";      //Variable qui permettra de jouer le son voulu
        let dict = utils.ParseArgs(message.argString); //Parse les arguments de la commande (message.argString contient uniquement les arguments)
        let BreakException = {}; //Permet d'arrêter la boucle for
        let VC = message.member.voiceChannel; //chat vocal de l'auteur de la commande 

        if (!VC){ // L'utilisateur n'est pas dans un chat vocal : renvoie une erreur
            let embed = new discord.RichEmbed();
                embed
                .setTitle("Erreur !")
                .setDescription("Vous devez être connecté à un chat vocal d'abord !")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setColor(0xFF0000);
            return message.channel.send(embed);
        }

        //Récupération du chemin vers les fichiers sons
        pathArray = pathName.split(path.sep);
        if (pathArray[pathArray.length - 1] === "citation" && pathArray[pathArray.length - 2] === "commands") {
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

        //Sans utiliser de filtre (arguments), tous les fichiers de sons sont sélectionnables 
        //Place tous les éléments du fichier d'index des sons dans le toplay[]
        Object.keys(sounds).forEach(element => {
            toplay.push(sounds[element]);
        });
        //console.log("sf toplay :"+toplay.length);

        //filtre sur l'index du livre voulu par l'utilisateur : vérifie que le filtre -l a bien été voulu par l'utilisateur et qu'il est bien borné
        if (dict['l']) {
            if(dict['l']>0 && dict['l']<=6){
                //Si c'est le cas : place dans toplaytemp[] les cas correspondants au critère
                toplay.forEach(element => {
                    if (element['book'] === parseInt(dict['l'])) {
                        toplaytemp.push(element);
                    }
                });
                //reprend les valeurs de toplaytemp[] dans le toplay[]
                toplay = toplaytemp.slice(0);
                //console.log("fl toplaytemp :"+toplaytemp.length);
                toplaytemp = [];
            }else{
                //Si le livre est inconnu : renvoie une erreur
                let embed = new discord.RichEmbed();
                embed
                .setTitle("Erreur !")
                .setDescription("Filtre Erroné sur la valeur l : veuillez choisir un nombre entre 1 et 6")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setColor(0xFF0000);
                return message.channel.send(embed);
            }
        }
        //filtre sur le personnage auteur de la citation (fonctionnement identique)
        if(dict['p']){
            toplay.forEach(element => {
                if (utils.RemoveAccents(element['character'].toLowerCase()).includes(utils.RemoveAccents(dict['p'].toLowerCase()))) {
                    toplaytemp.push(element);
                }
            });
            toplay = toplaytemp.slice(0);
            //console.log("fp toplaytemp :"+toplaytemp.length);
        }
        //console.log("fp toplay :"+toplay.length);
        
        if(toplay.length ==0){ //Si aucune citation ne correspond aux critères, renvoie une erreur
            let embed = new discord.RichEmbed();
                embed
                .setTitle("Erreur !")
                .setDescription("Aucune citation correspondant aux critères n'a été trouvé.")
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Dialog-error-round.svg/48px-Dialog-error-round.svg.png')
                .setColor(0xFF0000);
            return message.channel.send(embed);
        }
        
        //Choix d'une citation aléatoire parmi toutes celles retenues
        let ind = Math.floor((Math.random() * toplay.length));
        
        //Le bot se connecte au chat vocal de l'utilisateur
        VC.join()
            .then(connection => {
                //joue le fichier son aléatoire
                //console.log("fichier : "+toplay[ind]);
                const dispatcher = connection.playFile(soundsPath + toplay[ind]['file']);
                //quitte le chat vocal quand la lecture est terminée
                dispatcher.on("end", end => { VC.leave() });
            })
            .catch(console.error)
    }
};
