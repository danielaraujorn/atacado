const { requireAuth } = require('./requireAuth')
const { requireRole } = require('./requireRole')
module.exports = {
	requireRole,
	requireAuth,
}
