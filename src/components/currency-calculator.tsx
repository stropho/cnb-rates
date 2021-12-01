import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import NativeSelect from '@material-ui/core/NativeSelect'
import {useForm} from 'react-hook-form'
import React from 'react'

import {useFetchCnbCurrencyRates} from '../hooks/endpoints'
import styled from 'styled-components'

type Inputs = {
	amount: number
	targetCurrency: string
}

const InputWrapper = styled.div`
	margin: 5px;
`

const numberInputValidation = {
	valueAsNumber: true,
	validate: (val: any) => typeof val === 'number' && !isNaN(val),
}

const CurrencyCalculator = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<Inputs>()

	const [calculatedResult, setCalculatedResult] = React.useState('')
	const {isLoading, error, data} = useFetchCnbCurrencyRates()

	const onSubmit = handleSubmit((formData) => {
		const {amount, targetCurrency} = formData
		const currencyRecord = data!.find(
			(currency) => currency.id === targetCurrency
		)!

		const calculation = (amount / currencyRecord.rate) * currencyRecord.amount

		setCalculatedResult(`${calculation} ${currencyRecord.id}`)
	})

	return (
		<>
			<h2>Currency Calculator</h2>
			{isLoading && 'Loading...'}
			{error && `An error has occurred: ${error.message}`}
			{data && (
				<div>
					<form onSubmit={onSubmit}>
						<InputWrapper>
							<TextField
								variant='outlined'
								size='small'
								label='CZK amount'
								defaultValue='100'
								{...register('amount', numberInputValidation)}
								{...(errors.amount && {
									error: true,
									helperText: 'Use a valid number',
								})}
							/>
						</InputWrapper>

						<InputWrapper>
							<NativeSelect {...register('targetCurrency')}>
								{data.map(({currency, id, country}) => {
									if (id === 'CZK') return null
									return (
										<option value={id}>
											{id} ({currency} - {country})
										</option>
									)
								})}
							</NativeSelect>
						</InputWrapper>

						<InputWrapper>
							<Button type='submit' color='primary'>
								Calculate
							</Button>
						</InputWrapper>
					</form>
					<div>{calculatedResult}&nbsp;</div>
				</div>
			)}
		</>
	)
}

export default CurrencyCalculator
