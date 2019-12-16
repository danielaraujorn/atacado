exports.createCartItem = async (_, args, ctx) => {
	const { productId, quantity } = args

	const { id: userId } = ctx.sessionUser

	const [cartItemCreated] = await ctx.prisma.cartItems({where:{
		product: { id: productId  },
		user: { id: userId } },
		first: 1,}
	)

	const cartItem = await(cartItemCreated?
	 ctx.prisma.updateCartItem({
		where: { id:cartItemCreated.id },
		data: { quantity,deleted:false },
	})
	:  ctx.prisma.createCartItem({
		quantity,
		product: { connect: { id: productId } },
		user: { connect: { id: userId } },
	}))

	return cartItem
}
