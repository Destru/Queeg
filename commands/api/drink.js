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

    if (args.length > 0) {
      const customDrinks = ['sidewalk slammer']
      const drink = args.join(' ').toLowerCase()

      if (customDrinks.includes(drink)) {
        switch (drink) {
          case 'rum and coke':
            embed
              .setDescription('Rum, and coke.')
              .setImage('https://')
              .setTitle('Rum and Coke')
          case 'sidewalk slammer':
            embed
              .setDescription(
                'Drink half a bottle of Olde English (40oz). ' +
                  'Refill said bottle with Four Loko. ' +
                  'Keep pouring in more Four Loko as needed. ' +
                  '\n*RoOoxanne* :notes:'
              )
              .setImage(
                'https://cyberpunksocial.club/images/sidewalkslammer.jpg'
              )
              .setTitle('Sidewalk Slammer')
              .addField('Category', 'Liquid Regret', true)
              .addField('Glass', 'Use the bottle, nerd.', true)
        }
        return message.channel.send(embed).then((message) => {
          message.react('😋')
          message.react('830114375053738034')
        })
      } else url += `search.php?s=${encodeURI(args.join(' '))}`
    } else url += 'random.php'

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks) {
          const drink = data.drinks[0]
          const query = encodeURI(`${drink.strDrink} drink recipe`)
          const recipe = `[Google](https://google.com/search?q=${query})`

          embed
            .setImage(drink.strDrinkThumb)
            .addField('Category', drink.strCategory, true)
            .addField('Glass', drink.strGlass, true)
            .addField('Recipe', recipe, true)
            .setTitle(drink.strDrink)

          if (drink.strInstructions) embed.setDescription(drink.strInstructions)

          message.channel.send(embed).then((message) => {
            message.react('😋')
          })
        } else message.channel.send("I don't know that one.")
      })
  },
}
