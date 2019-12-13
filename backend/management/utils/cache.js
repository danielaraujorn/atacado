const getType = require('./getType')
const formatKey = require('./formatKey')
const redis = require('../config/redis')

const expires = ([tag, key], time) => {
	if (!key) throw new TypeError("argument 'key' is required.")

	return time
		? redis.pexpire(formatKey(tag, key), time)
		: Promise.resolve(false)
}

const set = async ([tag, key], value, opts = {}) => {
	if (!key) throw new TypeError("argument 'key' is required.")

	const newKey = formatKey(tag, key)
	const type = getType(value)

	if (type === 'string') await redis.set(newKey, value)
	else if (type === 'object') await redis.hmset(newKey, value)

	return opts.expires && expires([tag, key], opts.expires)
}

const get = ([tag, key], value) => {
	if (!key) throw new TypeError("argument 'key' is required.")

	const newKey = formatKey(tag, key)

	if (value && getType(value) === 'array') {
		return value.length && value[0] === '*'
			? redis.hgetall(newKey)
			: redis.hmget(newKey, value)
	}

	return redis.get(newKey)
}

const remove = ([tag, key], value) => {
	if (!key) throw new TypeError("argument 'key' is required.")

	const newKey = formatKey(tag, key)

	return getType(value) === 'array'
		? redis.hdel(newKey, value)
		: redis.del(newKey)
}

const has = ([tag, key]) => {
	const KEY_EXISTS = '1'
	return (
		tag &&
		key &&
		redis.exists(formatKey(tag, key)).then(value => value === KEY_EXISTS)
	)
}

const hvals = ([tag, key]) =>
	key ? redis.hvals(formatKey(tag, key)) : Promise.resolve([])

const incr = ([tag, key], opts) =>
	redis
		.incr(formatKey(tag, key))
		.then(() => opts.expires && expires([tag, key], opts.expires))

const rateLimit = ([tag, key], limit, opts) =>
	get([tag, key]).then(current => {
		if (current !== null && current > limit) {
			return true
		}
		incr([tag, key], opts)
		return false
	})

module.exports = {
	rateLimit,
	incr,
	hvals,
	has,
	remove,
	set,
	get,
}
