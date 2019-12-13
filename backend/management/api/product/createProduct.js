const getUserModelPermission = require('../getUserModelPermission')
const normalizeString = require('../../utils/normalizeString')

exports.createProduct = async (_, args, ctx) => {
	const { name, storeId, price, description } = args

	await getUserModelPermission({ ctx, model: 'store', storeId })

	const product = await ctx.prisma.createProduct({
		name,
		normalizedName: normalizeString(name),
		description,
		store: { connect: { id: storeId } },
		price,
	})
	return product
}
