module.exports = {
  name: 'ping',
  description: 'Check latency',
  args: false,
  execute(message, args, client) {
    message.channel.send(`${Date.now() - message.createdTimestamp}ms / ${Math.round(client.ws.ping)}ms`);
  },
};