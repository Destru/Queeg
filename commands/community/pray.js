const { role } = require('../../config')

module.exports = {
  name: 'pray',
  description: 'Pray for forgiveness; leave horny jail and the satanic temple.',
  restricted: 'voter',
  execute(message) {
    if (message.member.roles.cache.has(role.sinner)) {
      message.member.roles.remove(role.sinner)
      message.channel.send(`You are filled with the source of all things.`)
    } else if (message.member.roles.cache.has(role.satanist)) {
      message.member.roles.remove(role.satanist)
      message.channel.send(`The light has found you. We wail for your return.`)
    } else {
      message.channel.send(`You feel nothing.`)
    }
  },
}
