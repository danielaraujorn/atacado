module.exports = obj =>
	({}.toString
		.call(obj)
		.match(/\s([a-zA-Z]+)/)[1]
		.toLowerCase())
