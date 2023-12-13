const crontab = require('../../crontab')

module.exports = {
  name: 'crontab',
  description: 'Run crontab tasks.',
  private: true,
  restricted: 'admin',
  execute(message) {
    crontab.run(message.client)
  },
}
