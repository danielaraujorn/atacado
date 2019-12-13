const { ForbiddenError } = require('apollo-server')

module.exports = async ({ ctx, model, id }) => {
	if (
		!(await ctx.prisma.$exists[model]({ id, user: { id: ctx.sessionUser.id } }))
	)
		throw new ForbiddenError('user is not the owner')
}
