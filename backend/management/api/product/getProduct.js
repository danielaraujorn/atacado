exports.getProduct = async (_, args, ctx) => {
	const { id } = args
	const product = await ctx.prisma.product({
		id,
	})
	return product
}
