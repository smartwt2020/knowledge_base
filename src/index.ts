import express from "express";
import path from "path"; 
import log from './utils/logger'
import kbRouter from './router/kb'

const routerConfig = require('./config/router')
const packageJson = require('../package.json')

const appPort = packageJson.port || 8100

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'static')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routerConfig.default.kb.basePath, kbRouter)

app.listen(appPort, () => {
  log.success(`Flex build community portal started on PORT: ${appPort}`)
  log.info(`Flex build community portal version: ${packageJson.version}`)
})
