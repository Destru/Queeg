require('dotenv').config(); 
const Discord = require("discord.js");
const client = new Discord.Client();

const ROLE_SUSPECT = '829420138079846471';

// #voight-kampff accounts that are <1 week old
client.on("guildMemberAdd", member => {
  if (Date.now() - member.user.createdAt < 1000*60*60*24*7) {
    member.addRole(ROLE_SUSPECT);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === 'ping') {
    message.channel.send('Pong!');
  } else
  if(command === 'suspect') {
    message.author.addRole(ROLE_SUSPECT);
  }
});

client.login();