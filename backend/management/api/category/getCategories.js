exports.getCategories = async (_, args, ctx) => {
	const { where } = args
	const categories = await ctx.prisma.categories({
		where,
	})

	return categories
}
