# KaamelottDiscordBot
Projet d'un Bot Discord utilisant les citations de la désormais célèbre série historique : Kaamelott. 

## Fonctions
Obtenir une citation aléatoire en fonction du livre et du personnage.  
Jouer à un quiz pour deviner quel personnage à pu dire cette phrase dans la série.  
Obtenir une version vocale de chaque citation.   
"Insulter" quelqu'un avec des insultes célèbres de la série. 

## Développeurs
[Aloïs BRETAUDEAU](https://github.com/Kilo-Graham), [Mickaël MENEUX](https://github.com/MickaMx), [Julien RAILLARD](https://github.com/jraillard), [Florent YVON](https://github.com/florentyvon)

## Bugs

## Evolutions

## Démo
![DemoQuiz](/demo/quizz.png)
![DemoCitation](/demo/citation.png)
## Installation :
### Prérequis :
1. Avoir [Node.js](https://nodejs.org/en/download/) d'installer sur le PC ou le serveur qui va héberger le bot.  
2. Avoir cloné le projet ou télécharger l'archive et l'avoir dézippé sur la machine. 
### Steps :
1. Ouvrir un terminal et se rendre dans le dossier d'installation du bot
2. Executer la ligne suivante pour installer toutes les dépendances du projet : 
```
npm install --save
```
2. Pour permettre au bot de "parler" sur les chats vocaux :  
    Installer [ffmpeg](https://ffmpeg.org/download.html) selon votre OS :  
        - Windows ou Mac : [Tutoriel](https://emirchouchane.com/tutoriel-ffmpeg/)  
        - Linux & Derivatives : [Tutoriel en PDF](lephmetre.fr/papers/ffmpeg_bases.pdf)  

3. Enfin, terminer par executer cette commande pour lancer le bot :
```
node --harmony .
```
