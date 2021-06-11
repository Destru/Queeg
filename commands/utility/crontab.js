const crontab = require('../../crontab')

module.exports = {
  name: 'crontab',
  description: 'Run cron.',
  admin: true,
  private: true,
  execute(message) {
    crontab.dev(message.client)
  },
}
