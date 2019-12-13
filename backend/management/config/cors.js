const allowedOrigins = ['http://localhost:3000']
const corsConfig = {
	origin: (origin, callback) => {
		/* allow requests with no origin
         (like mobile apps or curl requests)
         if (!origin) return callback(null, true) */

		return process.env.NODE_ENV !== 'production' ||
			allowedOrigins.includes(origin)
			? callback(null, true)
			: callback(
					new Error(
						`The CORS policy for this site 
                        does not allow access from the specified Origin.`
					),
					false
			  )
	},
	credentials: true,
	methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
}

module.exports = corsConfig
