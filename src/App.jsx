import { useState, useCallback } from "react"
import Globe from "./components/Globe"
import Sidebar from "./components/Sidebar"
import stores from "./data/stores"

// Notable vinyl cities to randomly pin
const RANDOM_LOCATIONS = [
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { lat: 52.52, lng: 13.405, label: "Berlin" },
  { lat: -37.8136, lng: 144.9631, label: "Melbourne" },
  { lat: 48.8566, lng: 2.3522, label: "Paris" },
  { lat: 45.5231, lng: -122.6765, label: "Portland" },
  { lat: 18.0120, lng: -76.7936, label: "Kingston" },
  { lat: 6.5244, lng: 3.3792, label: "Lagos" },
  { lat: 36.1627, lng: -86.7816, label: "Nashville" },
  { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
  { lat: 37.5665, lng: 126.978, label: "Seoul" },
  { lat: 23.1136, lng: -82.3666, label: "Havana" },
  { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
  { lat: 41.8781, lng: -87.6298, label: "Chicago" },
  { lat: 55.7558, lng: 37.6173, label: "Moscow" },
  { lat: 28.6139, lng: 77.209, label: "New Delhi" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
]

export default function App() {
  const [droppedPin, setDroppedPin] = useState(null)
  const [selectedStore, setSelectedStore] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handlePinDrop = useCallback(({ lat, lng }) => {
    setDroppedPin({ lat, lng })
    setSelectedStore(null)
    setSidebarOpen(true)
  }, [])

  const handleStoreClick = useCallback((store) => {
    setSelectedStore(store)
    setDroppedPin({ lat: store.lat, lng: store.lng })
    setSidebarOpen(true)
  }, [])

  const handleRandomPin = useCallback(() => {
    const loc = RANDOM_LOCATIONS[Math.floor(Math.random() * RANDOM_LOCATIONS.length)]
    // Add a bit of randomness so it doesn't feel repetitive
    const lat = loc.lat + (Math.random() - 0.5) * 2
    const lng = loc.lng + (Math.random() - 0.5) * 2
    handlePinDrop({ lat, lng })
  }, [handlePinDrop])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  return (
    <div className="app">
      <Globe
        onPinDrop={handlePinDrop}
        onStoreClick={handleStoreClick}
        droppedPin={droppedPin}
      />
      <Sidebar
        droppedPin={droppedPin}
        selectedStore={selectedStore}
        onStoreClick={handleStoreClick}
        onRandomPin={handleRandomPin}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />
    </div>
  )
}
