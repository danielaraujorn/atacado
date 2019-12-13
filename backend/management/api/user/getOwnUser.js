const { getOwnUserFragment } = require('./fragments')

exports.getOwnUser = async (_, args, ctx) => {
	const getOwnUser = await ctx.prisma
		.user({ id: ctx.sessionUser.id })
		.$fragment(getOwnUserFragment)

	return getOwnUser
}
