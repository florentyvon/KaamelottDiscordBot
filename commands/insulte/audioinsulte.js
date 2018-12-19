const commando = require('discord.js-commando');
const insultes = require('./insults.json');
const path = require('path');
const discord = require('discord.js');

module.exports = class RandomAudioInsulteCommand extends commando.Command {
    constructor(client) {
        let nb = Object.keys(insultes).length;
        let mess = Math.floor(Math.random() * nb) + 1;
        // Only set client + CommandInfo
        super(client, {
            name: 'audioinsulte',
            group: 'insulte',
            memberName: 'audioinsulte',
            description: 'Get random insult',
            aliases: ['ai'],
            examples: ['k!audioinsulte @user', 'k!audioinsulte @user insult_id', 'Try k!insultelist to know all insult IDs'], // string array with different using  (Not Necessary)
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to insult ? ',
                    type: 'user',
                },
                {
                    key: 'id',
                    prompt: 'Do you want to send a precise insult ?',
                    type: 'integer',
                    default: mess
                }
            ]
        });
    }

    async run(message, { user, id }) {
        //message.delete();
        let VCm = message.member.voiceChannel;
        let VC = [];
        let soundsPath = "";
        let pathArray = [];
        let toplay = [];
        let pathName = __dirname;
        let BreakException = {};
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
        VC = message.guild.channels;
        VCm.join();
        //try {
            VC.forEach(element => {
                if (element.type === 'voice' && VCm.id === element.id) {
                    if (element.members.has(user.id)) {
                        toplay = insultes;
                        VCm.join()
                            .then(connection => {
                                const dispatcher = connection.playFile(soundsPath + toplay[id]['audio']);
                                dispatcher.on("end", end => { VCm.leave() });
                            })
                            .catch(console.error);
                        //throw BreakException;
                    } else {
                        let embed = new discord.RichEmbed();
                        embed
                            .setDescription("Join the same voice channel that the person you want to audioinsult, NEWBIE !")
                            .setColor(0x00ae86);
                        return message.channel.send(embed);
                    }
                }
            });
        //} catch (e) {
        //    if (e !== BreakException) throw e;
        //}
    }
};