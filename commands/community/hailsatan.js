const { role } = require('../../config')

module.exports = {
  name: 'hailsatan',
  description: `Pledge your allegiance to Satan.`,
  aliases: ['hail-satan', 'hail'],
  restricted: 'voter',
  execute(message) {
    if (message.member.roles.cache.has(role.satanist)) {
      message.channel.send(`<:hailsatan:450846760886206464>`)
    } else {
      message.member.roles.add(role.satanist)
      message.channel.send(
        `You've been granted access to the temple, fellow \`Satanist\` ` +
          `<:baphomet:866887258892140574>`
      )
    }
  },
}
