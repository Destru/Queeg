const Discord = require('discord.js')
const fetch = require('node-fetch')
const { embedColor } = require('../../config')

module.exports = {
  name: 'weather',
  description: `Get the weather in any city.`,
  aliases: ['city'],
  args: true,
  example: 'oslo',
  execute(message, args) {
    const api = 'https://community-open-weather-map.p.rapidapi.com/'
    const city = args.join(' ')
    const embed = new Discord.MessageEmbed().setColor(embedColor)

    let emoji = ''

    fetch(`${api}weather?q=${city}&units=metric`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.WEATHER_KEY,
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.weather && data.weather.length > 0) {
          const description = `(${data.weather[0].description})`
          const weather = data.weather[0].main

          embed
            .setDescription(`${weather} ${description} ${emoji}`)
            .setTitle(data.name)
            .addFields(
              {
                name: `Temperature`,
                value:
                  `Current \`${data.main.temp}°\`` +
                  `\nHumidity \`${data.main.humidity}\`` +
                  `\nPressure \`${data.main.pressure}\`` +
                  ``,
                inline: true,
              },
              {
                name: `Wind`,
                value:
                  `Speed \`${data.wind.speed || 0}\`` +
                  `\nDeg \`${data.wind.deg || 0}\`` +
                  `\nGust \`${data.wind.gust || 0}\``,
                inline: true,
              },
              {
                name: `Resources`,
                value: `[View on Google Maps](https://google.com/maps/search/${data.coord.lat},${data.coord.lon}) :map:`,
              }
            )

          message.channel.send(embed)
        } else {
          message.channel.send(`Couldn't find that city.`)
        }
      })
  },
}
