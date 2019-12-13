const normalizeString = require('../../utils/normalizeString')

exports.createStore = async (_, args, ctx) => {
	const { name, products = [] } = args
	const store = await ctx.prisma.createStore({
		user: { connect: { id: ctx.sessionUser.id } },
		name,
		normalizedName: normalizeString(name),
		products: {
			create: products,
		},
	})
	return store
}
