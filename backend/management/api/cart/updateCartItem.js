const getUserModelPermission = require('../getUserModelPermission')

exports.updateCartItem = async (_, args, ctx) => {
	const { id, quantity } = args
	await getUserModelPermission({ ctx, model: 'cartItem', id })

	const cartItem = await ctx.prisma.updateCartItem({
		where: { id },
		data: { quantity },
	})

	return cartItem
}
