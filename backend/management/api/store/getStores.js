exports.getStores = async (_, args, ctx) => {
	const { where } = args
	const stores = await ctx.prisma.stores({
		where,
	})

	return stores
}
