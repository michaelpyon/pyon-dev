import { useState } from 'react';
import walks from './data/walks';
import NeighborhoodSelector from './components/NeighborhoodSelector';
import WalkMap from './components/WalkMap';
import BuildingCard from './components/BuildingCard';

export default function App() {
  const [selectedWalk, setSelectedWalk] = useState(null);
  const [activeBuilding, setActiveBuilding] = useState(0);

  function handleSelectWalk(walk) {
    setSelectedWalk(walk);
    setActiveBuilding(0);
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="px-6 pt-12 pb-8 max-w-5xl mx-auto sm:pt-16 sm:pb-10">
        <h1
          className="font-display text-4xl sm:text-6xl text-text tracking-tight leading-[0.95] mb-3 animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          ArchiMap
        </h1>
        <p
          className="text-text-muted text-sm leading-relaxed max-w-md animate-fade-up"
          style={{ animationDelay: '250ms' }}
        >
          Pick a neighborhood. Walk the route. See the architecture.
        </p>
      </header>

      {/* Neighborhood Selector */}
      <section
        className="px-6 max-w-5xl mx-auto mb-6 animate-fade-up"
        style={{ animationDelay: '400ms' }}
      >
        <p className="text-text-subtle text-xs font-mono tracking-widest uppercase mb-4">
          Neighborhoods
        </p>
        <NeighborhoodSelector
          walks={walks}
          selected={selectedWalk}
          onSelect={handleSelectWalk}
        />
      </section>

      {/* Walk Content */}
      {selectedWalk && (
        <main className="px-6 max-w-5xl mx-auto pb-16 animate-fade-in">
          {/* Walk header */}
          <div className="mb-6 mt-4">
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="text-lg font-semibold text-text tracking-tight">
                {selectedWalk.neighborhood}
              </h2>
              <span className="text-[10px] font-mono text-text-subtle tracking-wide">
                {selectedWalk.borough}
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              {selectedWalk.description}
            </p>
            <p className="text-[10px] font-mono text-text-subtle mt-2">
              {selectedWalk.buildings.length} stops
            </p>
          </div>

          {/* Map + Building List */}
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <WalkMap
              walk={selectedWalk}
              activeBuilding={activeBuilding}
              onBuildingClick={setActiveBuilding}
            />

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
              {selectedWalk.buildings.map((building, i) => (
                <BuildingCard
                  key={`${selectedWalk.id}-${i}`}
                  building={building}
                  index={i}
                  isActive={activeBuilding === i}
                  onClick={() => setActiveBuilding(i)}
                />
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Empty State */}
      {!selectedWalk && (
        <div className="px-6 max-w-5xl mx-auto py-20 text-center animate-fade-in">
          <p className="text-text-subtle text-xs font-mono tracking-wide">
            Select a neighborhood to begin
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="px-6 pb-8 max-w-5xl mx-auto border-t border-border pt-6 mt-12">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-text-subtle font-mono">
            Data: NYC LPC, AIA Guide, Wikipedia
          </span>
          <span className="text-[11px] text-text-subtle font-mono">
            ArchiMap
          </span>
        </div>
      </footer>
    </div>
  );
}
