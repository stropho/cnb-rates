import {DataGrid} from '@mui/x-data-grid'
import type {GridColDef} from '@mui/x-data-grid'
import styled from 'styled-components'
import {useFetchCnbCurrencyRates} from './../hooks/endpoints'

const columns: GridColDef[] = [
	{field: 'country', headerName: 'Country', width: 190},
	{field: 'currency', headerName: 'Currency', width: 120},
	{field: 'amount', headerName: 'Amount', align: 'right', width: 120},
	{field: 'id', headerName: 'Symbol', width: 120},
	{field: 'rate', headerName: 'Rate', align: 'right', width: 120},
]

const GridWrapper = styled.div`
	height: 800px;
	width: 800px;
	margin: auto;
`

const CurrencyList = () => {
	const {isLoading, error, data} = useFetchCnbCurrencyRates()
	return (
		<>
			<h2>Currency List</h2>
			{isLoading && 'Loading...'}
			{error && `An error has occurred: ${error.message}`}
			{data && (
				<GridWrapper>
					<DataGrid disableColumnFilter rows={data} columns={columns} />
				</GridWrapper>
			)}
		</>
	)
}

export default CurrencyList
