const Discord = require('discord.js')
const fetch = require('node-fetch')
const config = require('../../config')
const { randomEmoji } = require('../../helpers')

module.exports = {
  name: 'drink',
  description: 'Have a drink.',
  restricted: 'Voters',
  args: false,
  execute(message) {
    if (message.member.roles.cache.has(config.role.voted)) {
      const embed = new Discord.MessageEmbed().setColor(config.embedColor)

      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then((data) => {
          const drink = data.drinks[0]
          const query = encodeURI(`${drink.strDrink} drink recipe`)
          const recipe = `[Google](https://google.com/search?q=${query})`

          embed
            .setTitle(drink.strDrink)
            .setDescription(
              `Enjoy your drink, comrade ${message.author} ${randomEmoji()}`
            )
            .setImage(drink.strDrinkThumb)
            .addField('Category', drink.strCategory, true)
            .addField('Glass', drink.strGlass, true)
            .addField('Recipe', recipe, true)

          message.channel.send(embed)
        })
    } else {
      message.channel.send(config.error.vote)
    }
  },
}
