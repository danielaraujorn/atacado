exports.toggleFavorite = async (_, args, ctx) => {
	const { id } = args

	const isProductFavorite = await ctx.prisma.$exists.product({
		id,
		favoriteUsers_some: { id: ctx.sessionUser.id },
	})

	await ctx.prisma.updateProduct({
		where: { id },
		data: {
			favoriteUsers: isProductFavorite
				? { disconnect: { id: ctx.sessionUser.id } }
				: { connect: { id: ctx.sessionUser.id } },
		},
	})

	return !isProductFavorite
}
