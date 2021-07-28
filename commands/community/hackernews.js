const Discord = require('discord.js')
const { embedColor } = require('../../config')
const fetch = require('node-fetch')

module.exports = {
  name: 'hackernews',
  description: `Top links from Hacker News.`,
  aliases: ['hn'],
  execute(message) {
    const api = 'https://hacker-news.firebaseio.com/v0/'
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(`Hacker News`)

    let articleCount = 10,
      links = []

    fetch(`${api}beststories.json`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i <= articleCount - 1; i++) {
          fetch(`${api}item/${data[i]}.json`)
            .then((response) => response.json())
            .then((data) => {
              const maxTitleLength = 74
              let title

              if (data.title.length > maxTitleLength)
                title = data.title.substring(0, maxTitleLength - 3) + '...'
              else title = data.title

              links.push(`[${title}](${data.url}) \`${data.score}\``)
            })
        }

        const poll = setInterval(() => {
          if (links.length === articleCount) {
            clearInterval(poll)

            embed.setDescription(links.join('\n'))
            message.channel.send(embed)
          }
        }, 100)
      })
  },
}
