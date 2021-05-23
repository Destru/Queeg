const prettyMs = require('pretty-ms');

module.exports = {
  name: 'uptime',
  description: 'Show uptime.',
  args: false,
  execute(message, args, client) {
    message.channel.send(prettyMs(client.uptime));
  },
};