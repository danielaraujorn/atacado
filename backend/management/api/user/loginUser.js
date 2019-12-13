// @ts-check
const bcrypt = require('bcryptjs')
const nanoid = require('nanoid')
const { ForbiddenError, AuthenticationError } = require('apollo-server')
const cache = require('../../utils/cache')
const { loginUserFragment } = require('./fragments')

exports.loginUser = async (_, args, ctx) => {
	const { email, password, rememberMe = false } = args
	const [userData] = await ctx.prisma
		.users({
			where: { email },
		})
		.$fragment(loginUserFragment)

	if (!userData) {
		throw new ForbiddenError('user not registered')
	}

	const { id } = userData

	if (await bcrypt.compare(password, userData.password)) {
		const sessionId = nanoid()

		const CLIENT_SESSION_EXPIRES = rememberMe
			? 2.592e9 /* 30 dias em milisegundos */
			: 2.16e7 /* 6 horas em milisegundos */

		await cache.set(['user/session', sessionId], id, {
			expires: CLIENT_SESSION_EXPIRES,
		})

		ctx.res.cookie('sessionId', sessionId, {
			httpOnly: true,
			signed: true,
			secure: process.env.NODE_ENV === 'production',
			...(rememberMe && { maxAge: CLIENT_SESSION_EXPIRES }),
			sameSite: process.env.NODE_ENV === 'production',
		})
		return { id }
	}

	const ATTEMPTS_EXPIRES = 10800000 // 3 hs
	const MAX_NUM_ATTEMPTS = 15
	const isMaxLoginAttempts = await cache.rateLimit(
		['user/login/attempts', id],
		MAX_NUM_ATTEMPTS,
		{ expires: ATTEMPTS_EXPIRES }
	)

	if (isMaxLoginAttempts) {
		throw new ForbiddenError('limit for login attempts has been reached')
	}

	throw new AuthenticationError('invalid login')
}
