// @ts-check

/**
 * @param {Array<String>} tag
 * @returns {String}
 */
module.exports = (...tag) =>
	`${process.env.VERSION}/${tag.filter(Boolean).join('/')}/`
