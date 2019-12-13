const { createProduct } = require('./createProduct')
const { getProducts } = require('./getProducts')
const { getProduct } = require('./getProduct')

module.exports = {
	Query: { getProduct, getProducts },
	Mutation: { createProduct },
}
