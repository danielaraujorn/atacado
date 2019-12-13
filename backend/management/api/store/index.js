const { createStore } = require('./createStore')
const { getStore } = require('./getStore')
const { getStores } = require('./getStores')

module.exports = {
	Query: { getStore, getStores },
	Mutation: { createStore },
}
