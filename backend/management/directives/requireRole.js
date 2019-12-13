const { AuthenticationError } = require('apollo-server')

exports.requireRole = (next, source, args, ctx) => {
	const { role } = args

	if (!ctx.sessionUser) {
		throw new AuthenticationError('user is not logged')
	} else if (ctx.sessionUser.role !== role) {
		throw new AuthenticationError('user dont have the right role')
	}
	return next()
}
