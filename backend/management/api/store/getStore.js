const { getStoreFragment } = require('./fragments')

exports.getStore = async (_, args, ctx) => {
	const { id } = args
	const store = await ctx.prisma
		.store({
			id,
		})
		.$fragment(getStoreFragment)
	return store
}
