const routes = require('next-routes')()

routes
  .add('/fundMe/new', '/fundMe/new')
  .add('/fundMe/:address', '/fundMe/show')
  .add('/fundMe/reciepient', '/fundMe/recipient')
  .add('/fundMe/:address/fundingPage', '/fundMe/fundingPage')

module.exports = routes
