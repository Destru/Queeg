const Discord = require('discord.js')
const { csc } = require('../config')
const { version } = require('../helpers')
const prettyMs = require('pretty-ms')

module.exports = {
  aliases: ['bot-info'],
  name: 'queeg',
  description: 'Show bot information.',
  args: false,
  execute(message, args, client) {
    const embed = new Discord.MessageEmbed()
      .setColor('#ffff00')
      .setTitle(`Queeg`)
      .setDescription('A backup computer that replaces Holly for certain tasks.\n[GitHub repository.](https://github.com/destru/queeg)')
      .setThumbnail('https://i.imgur.com/3hPFDFb.jpg')
      .addFields(
        { name: 'Latency', value: `${Date.now() - message.createdTimestamp}ms / ${Math.round(client.ws.ping)}ms`, inline: true},
        { name: 'Uptime', value: prettyMs(client.uptime), inline: true },
        { name: 'Version', value: version, inline: true },
      )
      .setFooter(csc.name, csc.logo)
    message.channel.send(embed)
  },
}