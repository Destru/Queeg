const { role } = require('../../config')

module.exports = {
  name: 'horny',
  description: `I'm so horny, uwu :tongue: :eggplant:`,
  restricted: 'voter',
  execute(message) {
    message.member.roles.add(role.sinner)
    message.channel.send(`Bonk!`)
  },
}
