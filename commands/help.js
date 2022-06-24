  
const pagination = require('discord.js-pagination');
const Discord = require('discord.js');
let config = require('../config.json');
module.exports = {
    name: 'help',
    description: 'help Command',
    execute(message, args){
      if(message.channel.id === config.CHANNELS_ID.HELP){
        let Fivem = new Discord.MessageEmbed()
        .setTitle('FiveM')
        .setColor('#ffaa17')
        .addField(`${config.PREFIX}status`, 'Voir le status du serveur')
        .addField(`${config.PREFIX}playerlist`, 'Voir les joueur connecté au serveur')
        .addField(`${config.PREFIX}suggest`, 'Faire une suggestion au serveur ')
        .setTimestamp()
        
        

        let utility = new Discord.MessageEmbed()
        .setTitle('Utlity')
        .setColor('#9500f2')
        .addField(`${config.PREFIX}ping`, 'afficher le ping du bot')
        .addField(`${config.PREFIX}clear <1-99>`, 'Clear le chat')
        .setTimestamp()

        let pages = [
                Fivem,
                utility
        ]

        
        
          message.delete();

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
      }else{
        message.delete();

        let wEmbed = new Discord.MessageEmbed()
        .setTitle("Oops!")
        .setColor("#fc2403")
        .setDescription(`Mauvais salon pour recevoir les aides, utilisez <#${config.CHANNELS_ID.HELP}> pour recevoir une aide.`);
        message.channel.send(wEmbed).then((wmsg) =>{
          setTimeout(() =>{
            wmsg.delete();
          },5000);
       });
      }
        
        

        
    }, 
};