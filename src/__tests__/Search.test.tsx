import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import Search from '@/components/Search'

// Mock Next.js router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
}))

describe('Search Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the search input with correct placeholder', () => {
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    expect(input).toBeInTheDocument()
  })

  it('should render the search button', () => {
    render(<Search />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should have correct initial state', () => {
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    expect(input).toHaveValue('')
  })

  it('should update input value when typing', async () => {
    const user = userEvent.setup()
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    await user.type(input, 'Madrid')
    
    expect(input).toHaveValue('Madrid')
  })

  it('should handle focus state correctly', async () => {
    const user = userEvent.setup()
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    const container = input.closest('.flex')
    
    await user.click(input)
    
    expect(container).toHaveClass('border-blue-500', 'shadow-lg', 'shadow-blue-500/20', 'scale-105')
  })

  it('should handle blur state correctly', async () => {
    const user = userEvent.setup()
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    const container = input.closest('.flex')
    
    await user.click(input)
    await user.tab()
    
    expect(container).not.toHaveClass('border-blue-500', 'shadow-lg', 'shadow-blue-500/20', 'scale-105')
  })

  it('should navigate to map page when search button is clicked with location', async () => {
    const user = userEvent.setup()
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    const button = screen.getByRole('button')
    
    await user.type(input, 'Barcelona')
    await user.click(button)
    
    expect(mockPush).toHaveBeenCalledWith('/map-page?location=Barcelona')
  })

  it('should navigate to map page when Enter key is pressed', async () => {
    const user = userEvent.setup()
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    
    await user.type(input, 'Valencia')
    await user.keyboard('{Enter}')
    
    expect(mockPush).toHaveBeenCalledWith('/map-page?location=Valencia')
  })

  it('should not navigate when search button is clicked with empty input', async () => {
    const user = userEvent.setup()
    render(<Search />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should not navigate when Enter key is pressed with empty input', async () => {
    const user = userEvent.setup()
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    await user.keyboard('{Enter}')
    
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should disable search button when input is empty', () => {
    render(<Search />)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should enable search button when input has content', async () => {
    const user = userEvent.setup()
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    const button = screen.getByRole('button')
    
    await user.type(input, 'Madrid')
    
    expect(button).not.toBeDisabled()
  })

  it('should handle spaces correctly in search', async () => {
    const user = userEvent.setup()
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    const button = screen.getByRole('button')
    
    await user.type(input, '  Madrid  ')
    await user.click(button)
    
    expect(mockPush).toHaveBeenCalledWith('/map-page?location=%20%20Madrid%20%20')
  })

  it('should handle special characters in search', async () => {
    const user = userEvent.setup()
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    const button = screen.getByRole('button')
    
    await user.type(input, 'San José, Costa Rica')
    await user.click(button)
    
    expect(mockPush).toHaveBeenCalledWith('/map-page?location=San%20Jos%C3%A9%2C%20Costa%20Rica')
  })

  it('should have correct container styling', () => {
    render(<Search />)
    
    const container = screen.getByPlaceholderText('Buscar ubicación').closest('.flex')
    expect(container).toHaveClass('border', 'rounded-full', 'overflow-hidden', 'p-2')
  })

  it('should have correct input styling', () => {
    render(<Search />)
    
    const input = screen.getByPlaceholderText('Buscar ubicación')
    expect(input).toHaveClass('px-4', 'py-2', 'w-full', 'outline-none', 'bg-transparent')
  })

  it('should have correct button styling', () => {
    render(<Search />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('p-2', 'transition-all', 'duration-200', 'hover:bg-gray-100', 'rounded-full')
  })
}) 