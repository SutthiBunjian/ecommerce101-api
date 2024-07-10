import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'
import { errorHandler, notFoundHandler } from './middlewares'

const app: Express = express()
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    preflightContinue: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ['Content-Disposition'],
  }),
)
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
    noSniff: false,
  }),
)
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

routes.initialRoutes(app)

app.use(errorHandler)
app.use(notFoundHandler)

export default app
