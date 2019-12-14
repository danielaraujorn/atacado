// const { getCartFragment } = require('./fragments')

exports.getCart = async (_, args, ctx) => {
	const getCart = await ctx.prisma.cartItems({
		where: { user: { id: ctx.sessionUser.id } },
	})
	// .$fragment(getOwnUserFragment)

	return getCart
}

exports.getCartCount = async (_, args, ctx) => {
	const getCartCount = await ctx.prisma
		.cartItemsConnection({
			where: { user: { id: ctx.sessionUser.id } },
		})
		.aggregate()
		.count()

	return getCartCount
}
