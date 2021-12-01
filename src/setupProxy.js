const czechLocaleNumberToNumber = (val) => Number(val.replace(',', '.'))

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
	{key: 'amount'},
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

module.exports = function (app) {
	app.get('/api/cnb-rates', (req, res) => {
		const data = `
    29.11.2021 #229
    země|měna|množství|kód|kurz
    Austrálie|dolar|1|AUD|16,264
    Brazílie|real|1|BRL|4,062
    Bulharsko|lev|1|BGN|13,125
    Čína|žen-min-pi|1|CNY|3,565
    Dánsko|koruna|1|DKK|3,452
    EMU|euro|1|EUR|25,670
    Filipíny|peso|100|PHP|45,198
    Hongkong|dolar|1|HKD|2,918
    Chorvatsko|kuna|1|HRK|3,409
    Indie|rupie|100|INR|30,313
    Indonesie|rupie|1000|IDR|1,589
    Island|koruna|100|ISK|17,463
    Izrael|nový šekel|1|ILS|7,205
    Japonsko|jen|100|JPY|20,020
    Jižní Afrika|rand|1|ZAR|1,407
    Kanada|dolar|1|CAD|17,871
    Korejská republika|won|100|KRW|1,909
    Maďarsko|forint|100|HUF|6,961
    Malajsie|ringgit|1|MYR|5,370
    Mexiko|peso|1|MXN|1,040
    MMF|ZPČ|1|XDR|31,728
    Norsko|koruna|1|NOK|2,513
    Nový Zéland|dolar|1|NZD|15,507
    Polsko|zlotý|1|PLN|5,466
    Rumunsko|leu|1|RON|5,186
    Rusko|rubl|100|RUB|30,550
    Singapur|dolar|1|SGD|16,623
    Švédsko|koruna|1|SEK|2,495
    Švýcarsko|frank|1|CHF|24,586
    Thajsko|baht|100|THB|67,586
    Turecko|lira|1|TRY|1,793
    USA|dolar|1|USD|22,762
    Velká Británie|libra|1|GBP|30,339
    `
			.trim()
			.split('\n')
			.slice(2)
			.map((row) => row.trim().split('|'))
			.map(assignValuesToPredefinedKeys)

		res.json(data)
	})
}
