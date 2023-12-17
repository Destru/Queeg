require('dotenv').config()
const Discord = require('discord.js')
const cron = require('node-cron')
const fetch = require('node-fetch')

const client = new Discord.Client()

client.on('ready', () => {
  console.log('Skynet online...')

  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'Global Thermonuclear War',
      type: 'PLAYING',
    },
  })
})

client.login()
