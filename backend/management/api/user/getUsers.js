const { getUsersFragment } = require('./fragments')

exports.getUsers = async (_, args, ctx) => {
	const { email } = args
	const users = await ctx.prisma
		.users({
			where: {
				id_not: ctx.sessionUser.id,
				email_starts_with: email,
			},
			first: 5,
		})
		.$fragment(getUsersFragment)

	return users
}
