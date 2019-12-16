const { createCartItem } = require('./createCartItem')
const { updateCartItem } = require('./updateCartItem')
const { getCartItem } = require('./getCartItem')
const { deleteCartItem } = require('./deleteCartItem')
const { getCart, getCartCount } = require('./getCart')

module.exports = {
	Query: { getCartItem, getCart, getCartCount },
	Mutation: { createCartItem, updateCartItem, deleteCartItem },
}
