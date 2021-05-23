module.exports = {
  name: 'ping',
  description: 'Check latency.',
  aliases: ['latency'],
  args: false,
  execute(message, client) {
    message.channel.send(`${Date.now() - message.createdTimestamp}ms / ${Math.round(client.ws.ping)}ms`);
  },
};