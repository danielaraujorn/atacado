const { createUser } = require('./createUser')
const { loginUser } = require('./loginUser')
const { getOwnUser } = require('./getOwnUser')
const { getUsers } = require('./getUsers')
const { getCart, getCartCount } = require('./getCart')

module.exports = {
	Query: { getOwnUser, getUsers, getCart, getCartCount },
	Mutation: { createUser, loginUser },
}
