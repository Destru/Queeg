const Discord = require('discord.js')
const jw = require('justwatch')
const { embedColor } = require('../../config')

module.exports = {
  name: 'watch',
  description: 'Find out where movies are streaming.',
  aliases: ['watchnow'],
  args: true,
  example: 'Blade Runner',
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle('Watch Now')
    const matches = await jw.search(encodeURI(args.join(' ')), false, 1)
    const providers = {
      2: { name: 'iTunes' },
      3: { name: 'Google' },
      7: { name: 'Vudu' },
      8: { name: 'Netflix' },
      9: { name: 'Amazon Prime' },
      10: { name: 'Amazon' },
      15: { name: 'Hulu' },
      43: { name: 'Starz' },
      68: { name: 'Microsoft' },
      139: { name: 'Cinemax' },
      192: { name: 'YouTube' },
      257: { name: 'Fubo TV' },
      279: { name: 'RedBox' },
      300: { name: 'Pluto TV' },
      337: { name: 'Disney+' },
      352: { name: 'AMC' },
      358: { name: 'DirectTV' },
      384: { name: 'HBO Max' },
      531: { name: 'Paramount+' },
    }

    if (!matches) return message.channel.send('No matches.')

    for (const match of matches.items) {
      const byProvider = (obj) => {
        if (providers.hasOwnProperty(obj.provider_id.toString())) return true
        return false
      }

      let description = `**${match.title}** (${match.original_release_year})\n`
      let filtered = []
      let formatted = []
      let formattedBuy = []
      let offers = false

      if (match.offers) offers = match.offers.filter(byProvider)
      if (offers.length) {
        offers.forEach((x) => {
          if (!filtered.some((y) => y.provider_id === x.provider_id)) {
            filtered.push(x)
          }
        })

        for (const offer of filtered) {
          let providerId = offer.provider_id.toString()
          if (
            offer.monetization_type === 'flatrate' ||
            offer.monetization_type === 'ads'
          )
            formatted.push(
              `[**${providers[providerId].name}**](${offer.urls.standard_web})`
            )
          else
            formattedBuy.push(
              `[${providers[providerId].name}](${offer.urls.standard_web})`
            )
        }

        if (formatted.length) description += `${formatted.join(', ')}\n`
        if (formattedBuy.length) description += `${formattedBuy.join(', ')}`
      }

      embed.setDescription(description)
    }
    message.channel.send(embed)
  },
}
