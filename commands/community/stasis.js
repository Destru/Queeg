const Discord = require('discord.js')
const { embedColor, role } = require('../../config')

module.exports = {
  name: 'stasis',
  description: 'Toggle experience gains.',
  aliases: ['enter-stasis', 'leave-stasis'],
  restricted: 'voter',
  execute(message) {
    const active = message.member.roles.cache.has(role.stasis)
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(`Stasis ${active ? 'Terminated' : 'Activated'}`)

    if (active) {
      embed.setDescription(
        'You have left stasis and XP gains have been resumed.'
      )
      message.member.roles.remove(role.stasis)
    } else {
      embed.setDescription(
        'You have successfully entered stasis. XP gains have been halted ' +
          'and you will remain at your current rank.'
      )
      message.member.roles.add(role.stasis)
    }
    message.channel.send(embed)
  },
}
