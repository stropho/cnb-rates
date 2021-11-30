import React from 'react'
import {render, screen} from '@testing-library/react'
import App from './App'

test('renders currency list title', () => {
	render(<App />)
	const listElement = screen.getByText(/Currency List/i)
	expect(listElement).toBeInTheDocument()
})

test('renders calculator title', () => {
	render(<App />)
	const listElement = screen.getByText(/Currency Calculator/i)
	expect(listElement).toBeInTheDocument()
})
