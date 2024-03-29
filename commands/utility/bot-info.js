const Discord = require('discord.js')
const prettyMs = require('pretty-ms')
const { embedColor } = require('../../config')
const { version } = require('../../helpers')

module.exports = {
  name: 'bot-info',
  description: 'Show bot information.',
  aliases: ['queeg'],
  private: true,
  execute(message) {
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setDescription(
        `<@836661328374267997> and I run the **Cyberpunk Social Club** <:cscbob:846528128524091422>` +
          `\n[GitHub Repo](https://github.com/destru/queeg) :link:`
      )
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
