const { getCartFragment } = require('./fragments')

exports.getCart = async (_, args, ctx) => {
	const { where } = args
	const getCart = await ctx.prisma
		.cartItems({
			where: { ...where, user: { id: ctx.sessionUser.id } },
		})
		.$fragment(getCartFragment)

	return getCart
}

exports.getCartCount = async (_, args, ctx) => {
	const { where } = args
	const getCartCount = await ctx.prisma
		.cartItemsConnection({
			where: { ...where, user: { id: ctx.sessionUser.id } },
		})
		.aggregate()
		.count()

	return getCartCount
}
