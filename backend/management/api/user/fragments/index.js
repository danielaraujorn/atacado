const gql = require('graphql-tag')

const idNameEmailPart = `id firstName email`

exports.createUserFragment = gql`
	fragment createUserFragment on User {
		id
	}
`
exports.getOwnUserFragment = gql`
	fragment getOwnUserFragment on User {
		${idNameEmailPart}
		role
	}
`
exports.getUsersFragment = gql`
	fragment getUsersFragment on User {
		${idNameEmailPart}
	}
`
exports.loginUserFragment = gql`
	fragment loginUserFragment on User {
		id
		password
	}
`
