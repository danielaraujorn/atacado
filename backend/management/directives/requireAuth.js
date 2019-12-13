const { AuthenticationError } = require('apollo-server')

exports.requireAuth = (next, source, args, ctx) => {
	if (!ctx.sessionUser) {
		throw new AuthenticationError('user is not logged')
	}
	return next()
}
