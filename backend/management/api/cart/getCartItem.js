const getUserModelPermission = require('../getUserModelPermission')
const { ForbiddenError } = require('apollo-server')

exports.getCartItem = async (_, args, ctx) => {
	const { productId } = args
	const { id: userId } = ctx.sessionUser

	const [cartItem] = await ctx.prisma.cartItems({
		where: { product: { id: productId }, user: { id: userId } },
		first: 1,
	})

	if(cartItem)
		await getUserModelPermission({ ctx, model: 'cartItem', id: cartItem.id })
	else 
		return {}

	return cartItem
}
