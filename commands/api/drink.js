const Discord = require('discord.js')
const fetch = require('node-fetch')
const { embedColor } = require('../../config')

module.exports = {
  name: 'drink',
  description: 'Have a drink.',
  restricted: 'voter',
  execute(message) {
    const embed = new Discord.MessageEmbed().setColor(embedColor)

    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => {
        const drink = data.drinks[0]
        const query = encodeURI(`${drink.strDrink} drink recipe`)
        const recipe = `[Google](https://google.com/search?q=${query})`

        embed
          .setTitle(drink.strDrink)
          .setThumbnail()
          .setImage(drink.strDrinkThumb)
          .addField('Category', drink.strCategory, true)
          .addField('Glass', drink.strGlass, true)
          .addField('Recipe', recipe, true)

        message.channel.send(embed).then((message) => {
          message.react('😋')
          message.react('🤮')
        })
      })
  },
}
