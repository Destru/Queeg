const config = require('../../config')
const { randomEmoji } = require('../../helpers')

module.exports = {
  name: 'resurrect',
  description: 'Come back to life.',
  args: false,
  restricted: 'voter',
  execute(message) {
    message.member.roles.remove('832393909988491304')
    message.channel.send(
      `Certainly, comrade ${message.member} ${randomEmoji()}`
    )
  },
}
