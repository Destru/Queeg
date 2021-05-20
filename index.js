require('dotenv').config(); 
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === 'ping') {
    message.channel.send('Pong!');
  }
});

client.login();