const { getCartFragment } = require('./fragments')

exports.getCart = async (_, args, ctx) => {
	const { where } = args
	const getCart = await ctx.prisma
		.cartGroups({
			where: { ...where, user: { id: ctx.sessionUser.id } },
		})
		.$fragment(getCartFragment)

	return getCart
}

exports.getCartItemCount = async (_, args, ctx) => {
	const { where } = args
	const getCartItemCount = await ctx.prisma
		.cartItemsConnection({
			where: { ...where, user: { id: ctx.sessionUser.id } },
		})
		.aggregate()
		.count()

	return getCartItemCount
}
