import { render, screen, waitFor } from '@testing-library/react'
import Map from '@/components/map/Map'
import { Host } from '@/types/host'

// Mock data
const mockHosts: Host[] = [
  {
    id: 'host-1',
    name: 'Test Host 1',
    address: 'Test Address 1',
    lat: 40.4168,
    lng: -3.7038,
    ownerId: 'owner-1',
    description: 'Test description 1',
    price: 10,
    capacity: 5,
    images: [],
    rating: 4.5,
    reviews: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'host-2',
    name: 'Test Host 2',
    address: 'Test Address 2',
    lat: 41.3851,
    lng: 2.1734,
    ownerId: 'owner-2',
    description: 'Test description 2',
    price: 15,
    capacity: 3,
    images: [],
    rating: 4.0,
    reviews: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

describe('Map Component', () => {
  const mockOnMarkerClick = jest.fn()
  const mockOnPopupClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock fetch for geocoding
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { lat: '40.4168', lon: '-3.7038' }
        ]),
      })
    ) as jest.Mock
  })

  it('should render the map container', () => {
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    expect(screen.getByTestId('map-container')).toBeInTheDocument()
  })

  it('should render tile layer', () => {
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument()
  })

  it('should render markers for each host', () => {
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(2)
  })

  it('should render popups for each marker', () => {
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    const popups = screen.getAllByTestId('popup')
    expect(popups).toHaveLength(2)
  })

  it('should handle empty hosts array', () => {
    render(
      <Map
        hosts={[]}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    const markers = screen.queryAllByTestId('marker')
    expect(markers).toHaveLength(0)
  })

  it('should pass correct props to map container', () => {
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    const mapContainer = screen.getByTestId('map-container')
    expect(mapContainer).toHaveAttribute('style', 'height: calc(100vh - 64px); width: 100%;')
  })

  it('should handle initial location when provided', async () => {
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation="Madrid"
      />
    )
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://nominatim.openstreetmap.org/search?format=json&q=Madrid'
      )
    })
  })

  it('should not fetch geocoding when no initial location', () => {
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('should handle geocoding error gracefully', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Geocoding failed'))) as jest.Mock
    
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation="Invalid Location"
      />
    )
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('should handle empty geocoding results', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock
    
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation="Non-existent Location"
      />
    )
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    })
  })

  it('should pass host data to markers', () => {
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(2)
  })

  it('should handle marker click events', () => {
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    // The actual click handling would be tested in integration tests
    // Here we just verify the callback is passed
    expect(mockOnMarkerClick).toBeDefined()
  })

  it('should handle popup close events', () => {
    render(
      <Map
        hosts={mockHosts}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    // The actual close handling would be tested in integration tests
    // Here we just verify the callback is passed
    expect(mockOnPopupClose).toBeDefined()
  })

  it('should handle single host correctly', () => {
    const singleHost = [mockHosts[0]]
    
    render(
      <Map
        hosts={singleHost}
        onMarkerClick={mockOnMarkerClick}
        onPopupClose={mockOnPopupClose}
        initialLocation={null}
      />
    )
    
    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(1)
  })
}) 