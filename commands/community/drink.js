const Discord = require('discord.js')
const config = require('../../config')
const fetch = require('node-fetch')

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
          const recipe = `[Google](https://google.com/search?q=${encodeURI(
            drink.strDrink
          )}+drink+recipe)`

          embed
            .setTitle(drink.strDrink)
            .setDescription(
              `Enjoy your drink, comrade ${message.author} ${config.emoji}`
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
