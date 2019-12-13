const bcrypt = require('bcryptjs')
const { SALTS_ROUND } = require('../config')
const { createUserFragment } = require('./fragments')

exports.createUser = async (_, args, ctx) => {
	const { password, ...rest } = args
	const { id } = await ctx.prisma
		.createUser({
			...rest,
			password: await bcrypt.hash(password, SALTS_ROUND),
		})
		.$fragment(createUserFragment)

	return { id }
}
