const { role } = require('../../config')

module.exports = {
  name: 'pray',
  description: 'Pray for forgiveness, and leave horny jail.',
  restricted: 'voter',
  execute(message) {
    if (message.member.roles.cache.has(role.sinner)) {
      message.member.roles.remove(role.sinner)
      message.channel.send(`You are filled with the source of all things.`)
    } else {
      message.channel.send(`You feel nothing.`)
    }
  },
}
