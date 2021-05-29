const Discord = require('discord.js')
const prettyMs = require('pretty-ms')
const { embedColor } = require('../../config')
const { version } = require('../../helpers')

module.exports = {
  name: 'about',
  description: 'Show bot information.',
  aliases: ['queeg'],
  args: false,
  execute(message) {
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setDescription(
        `A backup computer that replaces Holly for certain tasks.` +
          `\n[GitHub repository.](https://github.com/destru/queeg)`
      )
      .setThumbnail('https://i.imgur.com/3hPFDFb.jpg')
      .setTitle(`Queeg`)
      .addFields(
        {
          name: 'Latency',
          value:
            `${Date.now() - message.createdTimestamp}ms /` +
            `${Math.round(message.client.ws.ping)}ms`,
          inline: true,
        },
        {
          name: 'Uptime',
          value: prettyMs(message.client.uptime),
          inline: true,
        },
        { name: 'Version', value: version, inline: true }
      )
    message.channel.send(embed)
  },
}
