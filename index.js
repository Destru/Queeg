require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ALPHABET = new Array('🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿');
const CSC = 'https://cdn.discordapp.com/emojis/837251418247004205.png?v=1';

client.on('ready', () => {
  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'Better Than Life',
      type: 'PLAYING'
    }
  });
});

client.on('guildMemberAdd', member => {
  const channelSuspect =  client.channels.cache.get('829418613051359292');
  const channelWelcome = client.channels.cache.get('844871570211995678');
  const roleSuspect = '829420138079846471';

  if (Date.now() - member.user.createdAt < 1000 * 60 * 60 * 24 * 7) {
    member.roles.add(roleSuspect);
    channelWelcome.send(`${member} has been flagged for _Voight-Kampff_.`);
    channelSuspect.send(`Read the _pinned message_ for more information, ${member}`);
  } else {
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=welcome+to+the+club&rating=g`)
      .then(response => response.json())
      .then(data => {
        channelWelcome.send(data.data.embed_url);
      });
  }
});

client.on('message', message => {
  const TREBEK = '400786664861204481';

  if (message.author.id === TREBEK && Math.random() < 0.01) {
    fetch('https://insult.mattbas.org/api/insult.json')
      .then(response => response.json())
      .then(data => {
        message.channel.send(`${data.insult}, <@${TREBEK}>`);
      });
  }

  if (message.author.bot) return;
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const content = args.join(' ');

  if (command === 'ping') {
    message.channel.send(`Pong (${Date.now() - message.createdTimestamp}ms / ${Math.round(client.ws.ping)}ms)`);
  } else 
  if (command === 'giphy') {
    let tag = encodeURI(content || message.channel.name);
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=${tag}&rating=g`)
      .then(response => response.json())
      .then(data => {
        message.channel.send(data.data.embed_url);
      });
  } else
  if (command === 'poll') {
    if (content.includes('|')) {
      const poll = content.split('|');
      const question = capitalize(poll.shift());

      let description = '';
      poll.forEach((option, i) => {
        description = description + `${ALPHABET[i]} ${capitalize(option)}\n`;
      });

      const embed = new Discord.MessageEmbed()
        .setTitle(question)
        .setColor('#ffff00')
        .setDescription(description)
        .setFooter('Poll 1.0e', CSC);

      message.channel.send(embed)
        .then(message => {
          for (let i = 0; i < poll.length; i++) {
            message.react(ALPHABET[i]);
          }
        });
    } else {
      message.channel.send(capitalize(content))
        .then(message => {
          message.react('462126280704262144');
          message.react('462126761098870784');
        });
    }
  } else
  if (message.author.id === process.env.ADMIN) {
    if(command === 'message') {
      let messageChannel = client.channels.cache.get(args.shift().replace(/\D/g, ''));
      messageChannel.send(args.join(' '));
    }
  }
});

client.login();