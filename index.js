require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");

const HELLO_WORLD = '844871570211995678';
const SUSPECT = '829420138079846471';
const TREBEK = '400786664861204481';

client.on('ready', () => {
  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'https://twitch.tv/notdestru',
      type: 'STREAMING'
    }
  });
});

client.on("guildMemberAdd", member => {
  fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=welcome&rating=g`)
    .then(response => response.json())
    .then(data => {
      client.channels.cache.get(HELLO_WORLD).send(data.embed_url);
    });

  if (Date.now() - member.user.createdAt < 1000 * 60 * 60 * 24 * 7) {
    member.roles.add(SUSPECT);
  }
});

client.on("message", message => {
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

  if (command === 'ping') {
    message.channel.send('Pong!');
  }
});

client.login();