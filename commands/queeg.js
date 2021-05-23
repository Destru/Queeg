const Discord = require('discord.js');
const { csc, cscLogo } = require('../config');
const { alphabetEmoji, version } = require('../helpers');
const prettyMs = require('pretty-ms');

module.exports = {
  aliases: ['bot-info'],
  name: 'queeg',
  description: 'Show bot information.',
  args: false,
  execute(message, args, client) {
    const embed = new Discord.MessageEmbed()
      .setColor('#ffff00')
      .setTitle(`${alphabetEmoji[16]} ${alphabetEmoji[20]} ${alphabetEmoji[4]} ${alphabetEmoji[4]} ${alphabetEmoji[6]}`)
      .setDescription('A backup computer that replaces Holly for certain tasks.\nhttps://github.com/destru/queeg')
      .setThumbnail('https://i.imgur.com/3hPFDFb.jpg')
      .addFields(
        { name: 'Latency', value: `${Date.now() - message.createdTimestamp}ms / ${Math.round(client.ws.ping)}ms`, inline: true},
        { name: 'Uptime', value: prettyMs(client.uptime), inline: true },
        { name: 'Version', value: version, inline: true },
      )
      .setFooter(csc, cscLogo);
    message.channel.send(embed);
  },
};