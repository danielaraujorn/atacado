const gql = require('graphql-tag')

const store = `id name updatedAt valid deleted createdAt`
const products = `
    products{
        id
        name
        valid
        deleted
        price
    }
`

exports.getStoreFragment = gql`
	fragment getStoreFragment on Store {
		${store}
        ${products}
	}
`
