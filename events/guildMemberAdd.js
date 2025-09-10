const { channel, role } = require('../config')

module.exports = {
  name: 'guildMemberAdd',
  execute(member, client) {
    const messageChannel = client.channels.cache.get(channel.terminal)
    if (Date.now() - member.user.createdAt < 1000 * 60 * 60 * 24 * 7) {
      member.roles.add(role.suspect)
      messageChannel.send(`${member} has been flagged for _Voight-Kampff_.`)
    }
  },
}
