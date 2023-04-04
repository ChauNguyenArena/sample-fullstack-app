import { render, screen } from '@testing-library/react'
import AppStore from './AppStore'

test('renders learn react link', () => {
  render(<AppStore />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
