/* eslint-disable security/detect-object-injection */
const fs = require('fs')
const dotenv = require('dotenv')

const envConfig = dotenv.parse(fs.readFileSync('./.env'))

Object.entries(envConfig).forEach(([key, value]) => {
	process.env[key] = value
})
