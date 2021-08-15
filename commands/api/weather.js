const Discord = require('discord.js')
const fetch = require('node-fetch')
const { embedColor } = require('../../config')

module.exports = {
  name: 'weather',
  description: `See what the weather is like there.`,
  args: true,
  example: 'oslo norway',
  execute(message, args) {
    const embed = new Discord.MessageEmbed().setColor(embedColor)
    let city = args.join(' ')

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=metric`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '2c3cbcc959msh750496ab26f3b33p148e3ejsn9e92d3adb783',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.weather && data.weather.length > 0) {
          const description = data.weather[0].description
          const weather = data.weather[0].main

          embed
            .setDescription(`${weather} (${description}).`)
            .setTitle(data.name)
            .addFields(
              {
                name: `Temperature :thermometer: `,
                value:
                  `Current \`${data.main.temp}°\`` +
                  `\nMin/Max \`${data.main.temp_min}°/${data.main.temp_max}°\`` +
                  `\nHumidity \`${data.main.humidity}\`` +
                  `\nPressure \`${data.main.pressure}\`` +
                  ``,
                inline: true,
              },
              {
                name: `Wind :cloud_tornado: `,
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
