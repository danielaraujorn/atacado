const gql = require('graphql-tag')

const idQuantity = `id quantity`
const product = `product{ id name price }`

exports.getCartFragment = gql`
	fragment getCartFragment on CartItem {
		${idQuantity}
        ${product}
	}
`
