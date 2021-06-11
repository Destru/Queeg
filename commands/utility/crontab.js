const crontab = require('../../crontab')

module.exports = {
  name: 'crontab',
  description: 'Run crontab tasks.',
  admin: true,
  private: true,
  execute(message) {
    crontab.run(message.client)
  },
}
