import { Application } from 'express'
import config from '../config'

import userRoute from './user.route'
import orderRoute from './order.route'
const prefixPath = config.api.basePath

function initialRoutes(app: Application) {
  app.use(`${prefixPath}/users`, userRoute)
  app.use(`${prefixPath}/orders`, orderRoute)

  app.use('/', async (req, reply) => {
    reply
      .status(200)
      .send(`api version ${config.api.version} ${console.log(prefixPath)}`)
  })
}

export default {
  initialRoutes,
}
