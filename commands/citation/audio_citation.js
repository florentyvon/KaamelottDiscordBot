const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');
const sounds = require('./sounds.json');
const path = require('path');
const discord = require('discord.js');

module.exports = class RandomAudioCitationCommand extends Command {
    constructor(client) {
        // Only set client + CommandInfo
        super(client, {
            name: 'audiocitation',
            group: 'citation',
            aliases: ['ac'],
            memberName: 'audiocitation',
            description: 'Joue l\'audio d\'une citation au hasard',
            examples: [
                'citation (aucun filtre)',
                'citation -l @numeroDeLivre (filtre sur un livre compris entre 1 et 6)',
                'citation -p @nomPersonnage (filtre sur le personnage)'
            ]
        });
    }

    // activated when "!run" is send in channel
    /*
     * WARNING : Node support async method but must specify " --harmony " when run the app
     * so it become : node --harmony . 
     */
    async run(message, { filter, value }) { //args are parameter after name command
        let toplay = [];
        let pathArray = []
        let pathName = __dirname;
        let soundsPath = "";
        let dict = ParseArgs(message.argString); //parsing the arguments
        var BreakException = {};
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
        if (dict['l'] & dict['l']>0 & dict['l']<=6) {
            Object.keys(sounds).forEach(element => {
                if (sounds[element]['book'] === dict['l']) {
                    toplay.push(sounds[element]['file']);
                }
            });
        }else{  
            if(dict['p']){
                Object.keys(sounds).forEach(element => {
                    if (sounds[element]['character'].toLowerCase().includes(dict['p'].toLowerCase())) {
                        toplay.push(sounds[element]['file']);
                    }
                });
            }else{
                Object.keys(sounds).forEach(element => {
                    var ind = Math.floor((Math.random()));
                    if (ind) {
                        toplay.push(sounds[element]['file']);
                    }
                });
            }
        }

        var ind = Math.floor((Math.random() * toplay.length));

        var VC = message.member.voiceChannel;
        if (!VC){
            let embed = new discord.RichEmbed();
                embed
                .setDescription("Join a voice channel, NEWBIE !")
                .setColor(0x00ae86);
            return message.channel.send(embed);
        }
        VC.join()
            .then(connection => {
                const dispatcher = connection.playFile(soundsPath + toplay[ind]);
                dispatcher.on("end", end => { VC.leave() });
            })
            .catch(console.error)
    }

    
};

function ParseArgs(message){
    if(message==="") return {};
    let args = message.trim().slice(1).split('-');
    args.forEach(element => {
        element.trim();
    });
    console.log(message);
    console.log(args);
    let dict = {};
    args.map(item =>{ var [k,v] = item.split(' '); 
                dict[k] = v;})
    console.log(dict)
    return dict;
}