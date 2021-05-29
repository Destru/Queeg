const { version } = require('../../helpers')

module.exports = {
  name: 'version',
  description: 'Show version.',
  args: false,
  private: true,
  execute(message) {
    message.channel.send(version)
  },
}
