const packagejson = require('../../package.json')

export default {
  env: process.env.NODE_ENV || '',
  api: {
    name: packagejson.name,
    version: packagejson.version,
    basePath: '/api/v1',
  },
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  line: {
    channelId: '2005529727',
    channelSecret: 'eacd5b5b340750caa2250855683654c5',
  },
}
