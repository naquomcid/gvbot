const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const config = require('./config.json');
const BOT_TOKEN = config.BOT_TOKEN;
const PREFIX = config.PREFIX;
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
let PlayerCount = require('./server/players');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
    
    setInterval(() => {
      PlayerCount.getPlayerCount().then((result) => {
          client.user.setActivity(`${result.data.length}/48 joueurs | gv/help 😘`,{ type: 'PLAYING' });
      })
    }, 1000);
});

client.login(process.env.TOKEN);

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', message =>{
  if(!message.content.startsWith(PREFIX) || message.author.bot) return
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if(!client.commands.has(command)) return
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
  }
});


client.on('message', message =>{
  
if(message.content === 'gv/ping'){
    const channel1 = client.channels.cache.find(channel => channel.id === "963957639279177818");
     channel1.send('20 ms')
     message.reply('Le message a été envoyé dans le salon <#963957639279177818> ')
     message.delete();
}
});


client.on('message', message =>{
  
  if(message.content === 'gv/status'){
      let config = require('./config.json');
const Discord = require('discord.js');
let PlayerCount = require('./server/players');
const channel1 = client.channels.cache.find(channel => channel.id === "963957639279177818");

  PlayerCount.getPlayerCount().then((result) => {

            if(result.status === 200){
                const onlineEmbed = new Discord.MessageEmbed()
                .setColor('#03fc41')
                .setTitle(config.SERVER_NAME)
                .setDescription(`**IP:** ${config.SERVER_URL}`)
                .setThumbnail(config.SERVER_LOGO)
                .addFields(
                    { name: 'Joueurs Connectés', value: result.data.length, inline: true  },
                    { name: 'Status Du Server', value: '✅ ONLINE', inline: true },
                    
                )
                .setTimestamp(new Date())
                .setFooter('Sent by: '+message.author.tag, `${config.SERVER_LOGO}`);
                channel1.send(onlineEmbed);
                message.delete();
           }
           

        })
           .catch(function(){
            const offlineEmbed = new Discord.MessageEmbed()
            .setColor('#fc0303')
            .setTitle(config.SERVER_NAME)
            .setDescription('IP: `148.251.104.85`')
            .setThumbnail(config.SERVER_LOGO)
            .addFields(
              { name: 'Joueur Connecté', value: '0', inline: true  },
              { name: 'Serveur status', value: '❌ OFFLINE', inline: true },
             
          )
            .setTimestamp(new Date())
            .setFooter('Sent by: '+message.author.tag, `${config.SERVER_LOGO}`);
            channel1.send(offlineEmbed);
            message.delete();
           })
         
           message.reply('Le message a été envoyé dans le salon <#963957639279177818> ')
          
    
  }
  });

