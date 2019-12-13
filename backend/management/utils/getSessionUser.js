const cache = require('./cache')

const getSessionUser = async (sessionId, prisma) => {
	const userId = sessionId && (await cache.get(['user/session', sessionId]))
	const sessionUserFragment = `
    fragment sessionUser on User {
        id
        firstName
        email
        role
        deleted
        createdAt
        updatedAt
    }`
	return userId && prisma.user({ id: userId }).$fragment(sessionUserFragment)
}

module.exports = getSessionUser
