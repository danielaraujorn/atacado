const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsConfig = require('./cors')

const app = express()

app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET))
app.use(cors(corsConfig))

module.exports = app
