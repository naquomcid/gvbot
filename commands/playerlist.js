let config = require('../config.json');
const Discord = require('discord.js');
let PlayerCount = require('../server/players');

module.exports = {
    name: 'playerlist',
    description: 'Tout Les Joueur connecté',
    execute(message, args){

        if(message.channel.id === config.CHANNELS_ID.PLAYERLIST){
            PlayerCount.getPlayerCount().then((result) => {
            
                let list = result.data;
                var id = "";
                var players = "";
                var ping = ""
                for(var i = 0; i < list.length; i++){
                    id += list[i].id+'\n';
                    players += list[i].name+'\n';
                    ping += list[i].ping+'\n';
                   
                }
                const pListEmbed = new Discord.MessageEmbed()
                    .setColor('#03fc41')
                    .setTitle('Joueurs Connectés')
                    .setDescription(`Total players: ${list.length}`)
                    .setThumbnail(config.SERVER_LOGO)
                    .addFields(
                        { name: 'Player ID', value: id, inline: true  },
                        { name: 'Player Name', value: players, inline: true  },
                        { name: '📶', value: `${ping}`, inline: true },
                       
                    )
                    .setTimestamp(new Date())
                    .setFooter('Envoyé by: '+message.author.tag, `${config.SERVER_LOGO}`);
                    message.channel.send(pListEmbed);
                
                
            })
            .catch(function(){
                const errpListEmbed = new Discord.MessageEmbed()
                    .setColor('#fc0303')
                    .setTitle('Joueurs Connectés')
                    .setDescription(`Joueurs Totals: 0`)
                    .setThumbnail(config.SERVER_LOGO)
                    .addFields(
                        { name: 'Player ID', value: '0', inline: true  },
                        { name: 'Player Name', value: 'Rien', inline: true  },
                        { name: 'Ping', value: 'Rien', inline: true },
                       
                    )
                    .setTimestamp(new Date())
                    .setFooter('Envoyé by: '+message.author.tag, `${config.SERVER_LOGO}`);
                    message.channel.send(errpListEmbed);
            })
            message.delete();
        }else{
            message.delete();
    
            let wEmbed = new Discord.MessageEmbed()
            .setTitle("Oops!")
            .setColor("#fc2403")
            .setDescription(`Mauvaise chaîne pour recevoir la liste des joueurs, utilises <#${config.CHANNELS_ID.PLAYERLIST}> pour recevoir la liste des joueurs`);
            message.channel.send(wEmbed).then((wmsg) =>{
              setTimeout(() =>{
                wmsg.delete();
              },5000);
           });
          }
        
    }, 
};