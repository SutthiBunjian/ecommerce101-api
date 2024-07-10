import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import config from './config'
import app from './app'

const { env, server } = config
console.log('env: ', env)

app.listen(server.port, () => {
  console.log(`environment is ${env}`)
  console.log(`server is running on port ${server.port}`)
})
