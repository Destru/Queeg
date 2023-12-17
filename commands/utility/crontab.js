const crontab = require('../../crontab')

module.exports = {
  name: 'crontab',
  description: 'Run crontab tasks.',
  aliases: ['cron'],
  private: true,
  restricted: 'admin',
  execute(message) {
    crontab.run(message.client)
  },
}
