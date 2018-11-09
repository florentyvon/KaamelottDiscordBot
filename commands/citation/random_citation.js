const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class RandomCitationCommand extends Command{
   /* init(){
        this.commands = undefined;
    }*/
    constructor(client){
        // Only set client + CommandInfo
        super(client, {
            name: 'citation',
            group: 'citation', 
            memberName: 'citation',
            description: 'Renvoi une citation aléatoire.', 
            examples: [ 
                'citation (aucun filtre)',
                'citation -l @numeroDeLivre (filtre sur un livre compris entre 1 et 6)',
                'citation -a @nomPersonnage (filtre sur le personnage)'
            ]/*, 
            args: [
                {
                    key: 'filter',
                    prompt: 'Quel filtre souhaitez-vous? (-l pour livre ou -a pour auteur)',
                    type: 'string',
                    validate: filter => {
                        if (filter === '-l' || filter === '-a' || filter === '') return true;
                        return 'Filtre Erroné';
                    },
                    default: ""
                },
                {
                    key: 'value',
                    prompt: 'Quel paramètre de filtre souhaitez-vous donner?',
                    type: 'string',
                    default: ''                    
                }
            ]  */          
        }); 
        //this.commands = {};
    }
/*
    async run(message, {filter, value}){  //args are parameter after name command
        
        var api = 'https://kaamelott.chaudie.re/api';
        switch(filter)
        {
            case "-l": 
                api = api.concat("/random/livre/" + value);
                break;
            case "-a":
                api = api.concat("/random/personnage/" + value);
                break;
            default:
               api = api.concat("/random");
                break;
        }
        
        fetch(api)
            .then(res => res.json())
            .then(function(json) {                
                message.reply(CitationToString(json));
            })
                .catch((err) => console.log(err + ' failed ' + filter));
    }
    */
   async run(message, args)
   {     
       var commands = [];
       var parameters = [];
       parameters = args.split('-');
       console.log(parameters);
       var length = parameters.length;
       var cmdFound = false;
       // create command array
       for (var i = 1; i < length; i++) {
            var commandValues = parameters[i].split(' ');
            console.log("commandValues" + commandValues);

            if(commandValues[0] !== "l" && commandValues[0] !== "a") { console.log(' wrong command'); return;}  // wrong command
            
            var commandLength = commands.length;
            var cmdFound = false;
            for(var j=0; j<commandLength; j++)
            {
                if(commandLength[j].commandName === commandValues[0]) 
                {
                    found=true;
                    break;
                }
            }

            if(!cmdFound)
            {
                commands.push({commandName: commandValues[0], commandValue: commandValues[1]});
            }
            console.log("commands :" + commands);
            cmdFound=false;            
        }     

        console.log("before sort" + commands);
        commands.sort((cmd1,cmd2) => (a.commandName < b.commandName) ? 1 : -1); 
        console.log("after  sort" +commands);

        fetch(this.GetApiRoute())
            .then(res => res.json())
            .then(function(json) {                
                message.reply(CitationToString(json));
            })
                .catch((err) => console.log(err + ' failed ' + filter));
   }

    AddCommandParameter(cmd, value)
    {
        if(this.commands.cmd === undefined)
        {
            this.commands.cmd = value;
        }
    }

    GetApiRoute()
    {
        var apiRoute = 'https://kaamelott.chaudie.re/api';

        if(this.commands.length = 0) return api.concat("/random");
        
        apiRoute = api.concat("/random")
        this.commands.forEach(element => {
            switch(filter)
            {
                case "l": 
                    apiRoute = api.concat("/livre/" + value);
                    break;
                case "a":
                    apiRoute = api.concat("/personnage/" + value);
                    break;
                default:                    
                    break;
            }
        });

        return apiRoute;
    }   

};

function CitationToString(json)
{
    return "\" " + json.citation.citation +
           " \"\nPersonnage : " + json.citation.infos.personnage + 
           "\n" + json.citation.infos.saison +
           "\nEpisode : " + json.citation.infos.episode;
};

function CheckCommandName(cmd)
{
    if(cmd === "l" || cmd === "a") return true;
        return false;
}


