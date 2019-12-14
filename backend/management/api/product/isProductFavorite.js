exports.isProductFavorite = async (_, args, ctx) => {
	const { id } = args
	const exist = await ctx.prisma.$exists.product({
		id,
		favoriteUsers_some: { id: ctx.sessionUser.id },
	})
	return exist
}
