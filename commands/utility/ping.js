module.exports = {
  name: 'ping',
  description: 'Check latency.',
  aliases: ['latency'],
  private: true,
  execute(message) {
    message.channel.send(
      `${Date.now() - message.createdTimestamp}ms / ${Math.round(
        message.client.ws.ping
      )}ms`
    )
  },
}
