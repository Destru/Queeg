module.exports = {
  name: 'ping',
  description: 'Check latency.',
  aliases: ['latency'],
  args: false,
  private: true,
  execute(message, args, client) {
    message.channel.send(`${Date.now() - message.createdTimestamp}ms / ${Math.round(client.ws.ping)}ms`)
  },
}