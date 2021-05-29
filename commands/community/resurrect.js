const config = require('../../config')
const { randomEmoji } = require('../../helpers')

module.exports = {
  name: 'resurrect',
  description: 'Come back to life.',
  restricted: 'Voters',
  args: false,
  execute(message) {
    if (message.member.roles.cache.has(config.role.voted)) {
      message.member.roles.remove('832393909988491304')
      message.channel.send(
        `Certainly, comrade ${message.member} ${randomEmoji()}`
      )
    } else {
      message.channel.send(config.error.vote)
    }
  },
}
