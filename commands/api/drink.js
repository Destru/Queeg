const Discord = require('discord.js')
const fetch = require('node-fetch')
const { embedColor } = require('../../config')

module.exports = {
  name: 'drink',
  description: 'Have a drink.',
  restricted: 'voter',
  execute(message, args) {
    const api = 'https://www.thecocktaildb.com/api/json/v1/1/'
    const embed = new Discord.MessageEmbed().setColor(embedColor)

    let url = api

    if (args.length > 0) url += `search.php?s=${encodeURI(args.join(' '))}`
    else url += 'random.php'

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const drink = data.drinks[0]
        const query = encodeURI(`${drink.strDrink} drink recipe`)
        const recipe = `[Google](https://google.com/search?q=${query})`

        embed
          .setAuthor(message.author.username, message.author.avatarURL())
          .setImage(drink.strDrinkThumb)
          .addField('Category', drink.strCategory, true)
          .addField('Glass', drink.strGlass, true)
          .addField('Recipe', recipe, true)
          .setTitle(drink.strDrink)

        if (drink.strInstructions) embed.setDescription(drink.strInstructions)

        message.channel.send(embed).then((message) => {
          message.react('😋')
        })
      })
  },
}
