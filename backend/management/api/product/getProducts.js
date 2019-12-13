exports.getProducts = async (_, args, ctx) => {
	const { where } = args
	const products = await ctx.prisma.products({
		where,
	})

	return products
}
