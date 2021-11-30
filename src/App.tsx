import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import './App.css'
import CurrencyList from './components/currency-list'
import CurrencyCalculator from './components/currency-calculator'
const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<CurrencyList />
				<CurrencyCalculator />
			</div>
		</QueryClientProvider>
	)
}

export default App
