require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

const config = require('./config');
const fetch = require('node-fetch');
const { admin, version } = require('./helpers');

const client = new Discord.Client({ ws: { intents: new Discord.Intents(Discord.Intents.ALL) }});
client.commands = new Discord.Collection();
const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commands) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Queeg ${version} is online.`);
  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'Socialist Propaganda',
      type: 'STREAMING',
      url: 'https://twitch.tv/notdestru',
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
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_TOKEN}&tag=welcome+to+the+club&rating=pg13`)
      .then(response => response.json())
      .then(data => {
        channelWelcome.send(data.data.embed_url);
      });
  }
});

client.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandInput = args.shift().toLowerCase();
  const command = client.commands.get(commandInput) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandInput));

  if (!command) return;

  if (command.args && !args.length) {
    if (command.admin && admin(message.author.id)) return message.channel.send(config.errorAccess);
    let error = config.errorArgs;
    if (command.example) error += `\nE.g. \`${config.prefix}${command.name} ${command.example}\``;
    return message.channel.send(error);
  }

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.channel.send(config.errorExecute);
  }
});

client.login();