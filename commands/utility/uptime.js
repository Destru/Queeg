const prettyMs = require('pretty-ms')

module.exports = {
  name: 'uptime',
  description: 'Show uptime.',
  private: true,
  execute(message) {
    message.channel.send(prettyMs(message.client.uptime))
  },
}
