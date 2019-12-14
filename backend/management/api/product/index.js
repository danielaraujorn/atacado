const { createProduct } = require('./createProduct')
const { getProducts } = require('./getProducts')
const { getProduct } = require('./getProduct')
const { isProductFavorite } = require('./isProductFavorite')
const { toggleFavorite } = require('./toggleFavorite')

module.exports = {
	Query: { getProduct, getProducts, isProductFavorite },
	Mutation: { createProduct, toggleFavorite },
}
