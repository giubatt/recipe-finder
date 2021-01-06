const express = require(`express`)
const morgan = require(`morgan`)
const bodyParser = require(`body-parser`)
const compress = require(`compression`)
const methodOverride = require(`method-override`)
const helmet = require(`helmet`)
const routes = require(`../api/routes`)
const { logs } = require(`./vars`)
// const error = require(`../api/middlewares/error`)

const app = express()

// request logging. dev: console | production: file
app.use(morgan(logs))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(compress())
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

app.use(`/`, routes)

// // if error is not an instanceOf APIError, convert it.
// app.use(error.converter)

// // catch 404 and forward to error handler
// app.use(error.notFound)

// // error handler, send stacktrace only during development
// app.use(error.handler)

module.exports = app
