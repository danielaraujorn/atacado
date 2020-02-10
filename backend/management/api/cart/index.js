const { createCartItem } = require('./createCartItem')
const { updateCartItem } = require('./updateCartItem')
const { getCartItem } = require('./getCartItem')
const { deleteCartItem } = require('./deleteCartItem')
const { getCart, getCartItemCount } = require('./getCart')

module.exports = {
	Query: { getCartItem, getCart, getCartItemCount },
	Mutation: { createCartItem, updateCartItem, deleteCartItem },
}
