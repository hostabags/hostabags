import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock dynamic imports
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFunc, options) => {
    const Component = importFunc()
    Component.displayName = 'DynamicComponent'
    return Component
  },
}))

// Mock Leaflet
jest.mock('leaflet', () => ({
  Icon: jest.fn().mockImplementation(() => ({
    iconUrl: '',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  })),
}))

// Mock react-leaflet
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children, ...props }) => <div data-testid="map-container" {...props}>{children}</div>,
  TileLayer: ({ ...props }) => <div data-testid="tile-layer" {...props} />,
  Marker: ({ children, ...props }) => <div data-testid="marker" {...props}>{children}</div>,
  Popup: ({ children, ...props }) => <div data-testid="popup" {...props}>{children}</div>,
  useMap: () => ({
    setView: jest.fn(),
  }),
}))

// Mock fetch
global.fetch = jest.fn()

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
} 