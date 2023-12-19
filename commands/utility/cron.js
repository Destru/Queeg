const crontab = require('../../crontab')

module.exports = {
  name: 'cron',
  description: 'Run cron table.',
  private: true,
  restricted: 'admin',
  execute(message) {
    crontab.test(message.client)
  },
}
