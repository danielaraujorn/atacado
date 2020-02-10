const { createCartItemFragment } = require('./fragments')

exports.createCartItem = async (_, args, ctx) => {
	const { productId, quantity } = args
	const { id: storeId } = await ctx.prisma.product({ id: productId }).store()

	const { id: userId } = ctx.sessionUser

	const [cartItemCreated] = await ctx.prisma.cartItems({
		where: {
			product: { id: productId },
			user: { id: userId },
			cartGroup: { store: { id: storeId } },
		},
		first: 1,
	})

	if (cartItemCreated) {
		return await ctx.prisma
			.updateCartItem({
				where: { id: cartItemCreated.id },
				data: { quantity, deleted: false },
			})
			.$fragment(createCartItemFragment)
	}
	const [cartGroupCreated] = await ctx.prisma.cartGroups({
		where: {
			store: { id: storeId },
			user: { id: userId },
		},
		first: 1,
	})

	return await ctx.prisma
		.createCartItem({
			quantity,
			product: { connect: { id: productId } },
			user: { connect: { id: userId } },
			cartGroup: cartGroupCreated
				? { connect: { id: cartGroupCreated.id } }
				: {
						create: {
							store: {
								connect: { id: storeId },
							},
							user: { connect: { id: userId } },
						},
				  },
		})
		.$fragment(createCartItemFragment)
}
