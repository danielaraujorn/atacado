const GraphQLJSON = require('graphql-type-json')
const { Query: UserQueries, Mutation: UserMutations } = require('./user')
const {
	Query: ProductQueries,
	Mutation: ProductMutations,
} = require('./product')
const { Query: StoreQueries, Mutation: StoreMutations } = require('./store')
const {
	Query: CategoryQueries,
	Mutation: CategoryMutations,
} = require('./category')
const { Query: CartQueries, Mutation: CartMutations } = require('./cart')

exports.resolvers = {
	Query: {
		...UserQueries,
		...ProductQueries,
		...StoreQueries,
		...CategoryQueries,
		...CartQueries,
	},
	Mutation: {
		...UserMutations,
		...ProductMutations,
		...StoreMutations,
		...CategoryMutations,
		...CartMutations,
	},
	//Subscription: {},
	JSON: GraphQLJSON,
}
