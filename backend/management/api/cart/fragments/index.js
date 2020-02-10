const gql = require('graphql-tag')

exports.createCartItemFragment = gql`
	fragment createCartItemFragment on CartItem {
		id
		deleted
		quantity
		product {
			id
			store {
				id
			}
		}
	}
`

exports.getCartFragment = gql`
	fragment getCartFragment on CartGroup {
		id
		freight
		freightStatus
		store {
			id
			name
		}
		items {
			id
			quantity
			deleted
			product {
				id
				name
				price
			}
		}
	}
`
