import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import HomePage from '@/app/(public)/page'
import Search from '@/components/Search'

// Mock the Search component
jest.mock('@/components/Search', () => {
  return function MockSearch() {
    return <div data-testid="search-component">Search Component</div>
  }
})

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} data-testid="hero-image" />
  },
}))

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the homepage with correct structure', () => {
    render(<HomePage />)
    
    // Check main container
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveClass('homepage')
  })

  it('should render the hero section with correct layout', () => {
    render(<HomePage />)
    
    const heroSection = screen.getByRole('main').querySelector('.hero-container')
    expect(heroSection).toBeInTheDocument()
    expect(heroSection).toHaveClass('flex', 'flex-col', 'md:flex-row')
  })

  it('should render the hero image with correct attributes', () => {
    render(<HomePage />)
    
    const heroImage = screen.getByTestId('hero-image')
    expect(heroImage).toBeInTheDocument()
    expect(heroImage).toHaveAttribute('alt', 'HostaBags. Tu espacio para equipaje')
    expect(heroImage).toHaveAttribute('width', '500')
    expect(heroImage).toHaveAttribute('height', '300')
  })

  it('should render the main heading with correct text', () => {
    render(<HomePage />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Tu espacio para equipaje.')
    expect(heading).toHaveTextContent('HostaBags')
  })

  it('should render the heading with correct styling', () => {
    render(<HomePage />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('text-4xl', 'md:text-5xl', 'font-extrabold', 'text-gray-800')
  })

  it('should render the description paragraph with correct text', () => {
    render(<HomePage />)
    
    const description = screen.getByText(/Almacena tu equipaje de forma segura/)
    expect(description).toBeInTheDocument()
    expect(description).toHaveTextContent(
      'Almacena tu equipaje de forma segura mientras exploras la ciudad. Encuentra anfitriones de confianza cerca de ti y reserva en segundo, porque tu aventura debería comenzar sin peso.'
    )
  })

  it('should render the description with correct styling', () => {
    render(<HomePage />)
    
    const description = screen.getByText(/Almacena tu equipaje de forma segura/)
    expect(description).toHaveClass('text-gray-600', 'text-lg', 'mb-6')
  })

  it('should render the Search component', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('search-component')).toBeInTheDocument()
  })

  it('should have responsive layout classes', () => {
    render(<HomePage />)
    
    const heroSection = screen.getByRole('main').querySelector('.hero-container')
    expect(heroSection).toHaveClass('md:flex-row')
    
    const imageContainer = heroSection?.querySelector('.w-full.md\\:w-1\\/2')
    expect(imageContainer).toBeInTheDocument()
    
    const textContainer = heroSection?.querySelectorAll('.w-full.md\\:w-1\\/2')[1]
    expect(textContainer).toBeInTheDocument()
  })

  it('should have correct spacing and padding', () => {
    render(<HomePage />)
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('px-6', 'py-10')
  })

  it('should have correct text alignment', () => {
    render(<HomePage />)
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('text-center')
    
    const textContainer = main.querySelector('.w-full.md\\:w-1\\/2:last-child')
    expect(textContainer).toHaveClass('text-left')
  })
}) 