const { createUser } = require('./createUser')
const { loginUser } = require('./loginUser')
const { getOwnUser } = require('./getOwnUser')
const { getUsers } = require('./getUsers')

module.exports = {
	Query: { getOwnUser, getUsers },
	Mutation: { createUser, loginUser },
}
