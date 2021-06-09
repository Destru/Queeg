const { role } = require('../../config')

module.exports = {
  name: 'pray',
  description: 'Pray for forgiveness. (Leave horny jail.)',
  restricted: 'voter',
  execute(message) {
    message.member.roles.remove(role.sinner)
    message.channel.send(`Your prayers have been heard.`)
  },
}
