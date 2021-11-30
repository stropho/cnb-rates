import {useFetchCnbCurrencyRates} from './../hooks/endpoints'

const CurrencyList = () => {
	const {isLoading, error, data} = useFetchCnbCurrencyRates()

	return (
		<>
			<h2>Currency List</h2>
			{isLoading && 'Loading...'}
			{error && `An error has occurred: ${error.message}`}
			{data && JSON.stringify(data)}
		</>
	)
}

export default CurrencyList
