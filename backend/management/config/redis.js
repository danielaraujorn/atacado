const Redis = require('ioredis')

const redisConfig = {
	host: process.env.REDIS_URL || 'localhost',
	port: process.env.REDIS_PORT || 6379,
}

const redis = new Redis(redisConfig)

redis.on('connect', () =>
	console.log(`Redis connectado na porta ${redisConfig.port}`)
)

redis.on('error', err => console.error(`Erro no redis - ${err.stack}`))

module.exports = redis
