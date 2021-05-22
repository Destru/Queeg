module.exports = {
  name: 'ping',
  description: 'Check latency',
  args: false,
  execute(message) {
    message.channel.send(`${Date.now() - message.createdTimestamp}ms`);
  },
};