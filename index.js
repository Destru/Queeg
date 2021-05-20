require('dotenv').config(); 
const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");

// magic strings 🦄
const ROLE_SUSPECT = '829420138079846471';
const TREBEK = '400786664861204481';

// #voight-kampff accounts that are <1 week old
client.on("guildMemberAdd", member => {
  if (Date.now() - member.user.createdAt < 1000*60*60*24*7) {
    member.roles.add(ROLE_SUSPECT);
  }
});

client.on("message", message => {
  // fuck you, Trebek
  if(message.author.id === TREBEK && Math.random() < 0.05) {
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

  if(command === 'ping') {
    message.channel.send('Pong!');
  }
});

client.login();
