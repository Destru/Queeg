const prettyMs = require('pretty-ms')

module.exports = {
  name: 'uptime',
  description: 'Show uptime.',
  args: false,
  private: true,
  execute(message) {
    message.channel.send(prettyMs(message.client.uptime))
  },
}
