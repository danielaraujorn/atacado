const bcrypt = require('bcryptjs')
const { prisma } = require('./generated/prisma-client')
const { SALTS_ROUND } = require('./api/config')
const normalizeString = require('./utils/normalizeString')
const main = async () => {
	const OWNER_DATA = {
		email: 'owner@email.com',
		password: await bcrypt.hash('12345678a', SALTS_ROUND),
		firstName: 'Owner',
		role: 'OWNER',
	}
	const OWNER = await prisma.createUser(OWNER_DATA)
	console.log(OWNER)

	const FOOD_CATEGORY_DATA = {
		name: 'Comida',
		normalizedName: normalizeString('Comida'),
	}
	const FOOD_CATEGORY = await prisma.createCategory(FOOD_CATEGORY_DATA)

	const PRODUCT_1_DATA = {
		name: 'Pizza de frango com catupiry',
		normalizedName: normalizeString('Pizza de frango com catupiry'),
		description: 'descrição em texto',
		price: 40,
		unit: 'unidade',
		categories: {
			connect: [{ id: FOOD_CATEGORY.id }],
		},
	}

	const PRODUCT_2_DATA = {
		name: 'Bolinha de queijo',
		normalizedName: normalizeString('Bolinha de queijo'),
		description: 'descrição em texto',
		price: 40,
		unit: '100 unidades',
		categories: {
			connect: [{ id: FOOD_CATEGORY.id }],
		},
	}

	const PRODUCT_3_DATA = {
		name: 'Mesa de 4 lugares',
		normalizedName: normalizeString('Mesa de 4 lugares'),
		description: 'descrição em texto',
		price: 10,
		unit: 'unidade',
		categories: {
			create: [{ name: 'Aluguel', normalizedName: normalizeString('Aluguel') }],
		},
	}

	const PRODUCT_4_DATA = {
		name: 'Garçom',
		normalizedName: normalizeString('Garçom'),
		description: 'descrição em texto',
		price: 10,
		unit: '1h de trabalho',
		categories: {
			create: [{ name: 'Serviço', normalizedName: normalizeString('Serviço') }],
		},
	}

	const STORE_1_DATA = {
		name: 'Loja 1',
		normalizedName: normalizeString('Loja 1'),
		user: { connect: { id: OWNER.id } },
		products: {
			create: [PRODUCT_1_DATA, PRODUCT_2_DATA],
		},
	}
	const STORE_1 = await prisma.createStore(STORE_1_DATA)
	console.log(STORE_1)

	const CLIENT_DATA = {
		email: 'client@email.com',
		password: await bcrypt.hash('12345678a', SALTS_ROUND),
		firstName: 'Daniel',
		role: 'CLIENT',
	}
	const CLIENT = await prisma.createUser(CLIENT_DATA)
	console.log(CLIENT)

	const OWNER_2_DATA = {
		email: 'owner2@email.com',
		password: await bcrypt.hash('12345678a', SALTS_ROUND),
		firstName: 'Owner 2',
		role: 'OWNER',
	}
	const OWNER_2 = await prisma.createUser(OWNER_2_DATA)
	console.log(OWNER_2)

	const STORE_2_DATA = {
		name: 'Loja 2',
		normalizedName: normalizeString('Loja 2'),
		user: { connect: { id: OWNER_2.id } },
		products: {
			create: [PRODUCT_3_DATA, PRODUCT_4_DATA],
		},
	}
	const STORE_2 = await prisma.createStore(STORE_2_DATA)
	console.log(STORE_2)
}

main()
