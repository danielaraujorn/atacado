const getUserModelPermission = require('../getUserModelPermission')

exports.deleteCartItem = async (_, args, ctx) => {
	const { id } = args

	await getUserModelPermission({ ctx, model: 'cartItem', id })

	const cartItem = await ctx.prisma.updateCartItem({
		where: { id },
		data: { deleted:true },
	})

	return cartItem
}
