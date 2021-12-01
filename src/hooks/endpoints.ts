import {useQuery} from 'react-query'

const EP_CNB_CURRENCY_RATE = '/api/cnb-rates'
const KEY_CNB_CURRENCY_RATE = '/api/cnb-rates'
type CnbCurrencyRate = {
	country: string
	currency: string
	amount: number
	id: string
	rate: number
}

const makeUseQuery = <Res, Err = Error>(dataKey: string, ep: string) => {
	const fetchData = () => fetch(ep).then((res) => res.json())
	return () => {
		return useQuery<Res, Err>(dataKey, fetchData)
	}
}
export const useFetchCnbCurrencyRates = makeUseQuery<CnbCurrencyRate[]>(
	KEY_CNB_CURRENCY_RATE,
	EP_CNB_CURRENCY_RATE
)
