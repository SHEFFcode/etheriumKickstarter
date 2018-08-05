const routes = require('next-routes')()

routes
  .add('/campaigns/new', '/campaigs/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests', '/campaigns/requests/index')
module.exports = routes
