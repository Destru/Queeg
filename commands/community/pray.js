module.exports = {
  name: 'pray',
  description: 'Pray for forgiveness.',
  restricted: 'voter',
  execute(message) {
    message.member.roles.remove('841071539645579325')
    message.channel.send(`Your prayers have been heard.`)
  },
}
