const routes = require('next-routes')()

routes
  .add('/campaigns/new', '/campaigs/new')
  .add('/campaigns/:address', '/campaigns/show')
module.exports = routes
