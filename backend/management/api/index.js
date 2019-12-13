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

exports.resolvers = {
	Query: {
		...UserQueries,
		...ProductQueries,
		...StoreQueries,
		...CategoryQueries,
	},
	Mutation: {
		...UserMutations,
		...ProductMutations,
		...StoreMutations,
		...CategoryMutations,
	},
	//Subscription: {},
	JSON: GraphQLJSON,
}
