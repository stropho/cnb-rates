const axios = require('axios').default

const czechLocaleNumberToNumber = (val) => Number(val.replace(',', '.'))

const CNB_URL =
	'http://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt'

/**
 * @typedef {{key: string, transform: (string) => number}} Column
 *
 */

/**
 * @type {Column[]}
 */
const COLUMNS = [
	{key: 'country'},
	{key: 'currency'},
	{key: 'amount', transform: czechLocaleNumberToNumber},
	{key: 'id'},
	{key: 'rate', transform: czechLocaleNumberToNumber},
]

/**
 *
 * @param {Column[]} cols
 * @param {string[]} values
 */
const assignValuesToKeys = (cols, values) => {
	return cols.reduce((acc, col, i) => {
		const val = values[i]
		acc[col.key] = col.transform ? col.transform(val) : val
		return acc
	}, {})
}

/**
 *
 * @param {string[]} values
 */
const assignValuesToPredefinedKeys = (values) =>
	assignValuesToKeys(COLUMNS, values)

/**
 *
 * @param {string} csv
 */
const cnbCsvToJson = (csv) =>
	csv
		.trim()
		.split('\n')
		.slice(2)
		.map((row) => row.trim().split('|'))
		.map(assignValuesToPredefinedKeys)

module.exports = function (app) {
	app.get('/api/cnb-rates', async (req, res) => {
		const response = await axios.get(CNB_URL)

		res.json(cnbCsvToJson(response.data))
	})
}
