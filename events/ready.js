const crontab = require('../crontab')
const { version } = require('../helpers')

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Queeg ${version} is online.`)

    // client.user.setPresence({
    //   status: 'online',
    //   activity: {
    //     name: 'Socialist Propaganda',
    //     type: 'STREAMING',
    //     url: 'https://twitch.tv/notdestru',
    //   },
    // })

    // crontab.load(client)
  },
}
