import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icons (Leaflet + bundler issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function createNumberedIcon(number, isActive) {
  return L.divIcon({
    className: 'archimap-marker',
    html: `<div style="
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: ${isActive ? '#fff' : '#525252'};
      color: ${isActive ? '#0a0a0a' : '#e5e5e5'};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
      border: 2px solid ${isActive ? '#fff' : '#737373'};
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      transition: all 0.2s ease;
    ">${number}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function MapUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [map, center, zoom]);
  return null;
}

export default function WalkMap({ walk, activeBuilding, onBuildingClick }) {
  const mapRef = useRef(null);

  if (!walk) return null;

  const routeCoords = walk.buildings.map((b) => [b.lat, b.lng]);

  return (
    <div className="rounded-lg overflow-hidden border border-border h-[400px] sm:h-[500px]">
      <MapContainer
        ref={mapRef}
        center={walk.center}
        zoom={walk.zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <MapUpdater center={walk.center} zoom={walk.zoom} />

        {/* Walking route line */}
        <Polyline
          positions={routeCoords}
          pathOptions={{
            color: '#525252',
            weight: 2,
            dashArray: '6, 8',
            opacity: 0.7,
          }}
        />

        {/* Building markers */}
        {walk.buildings.map((building, i) => (
          <Marker
            key={`${walk.id}-${i}`}
            position={[building.lat, building.lng]}
            icon={createNumberedIcon(i + 1, activeBuilding === i)}
            eventHandlers={{
              click: () => onBuildingClick(i),
            }}
          >
            <Popup>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#0a0a0a' }}>
                <strong>{building.name}</strong>
                <br />
                {building.year} · {building.style}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
