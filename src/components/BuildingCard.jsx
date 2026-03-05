import { useEffect, useRef } from 'react';

export default function BuildingCard({ building, index, isActive, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isActive]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`
        w-full text-left rounded-lg border p-4 transition-all duration-200 group
        ${
          isActive
            ? 'bg-surface-hover border-border-hover'
            : 'bg-surface border-border hover:border-border-hover hover:bg-surface-hover'
        }
      `}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <span className={`text-xs font-mono tabular-nums ${isActive ? 'text-white' : 'text-text-subtle'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className={`text-sm font-semibold tracking-tight ${isActive ? 'text-white' : 'text-text'}`}>
          {building.name}
        </h3>
      </div>

      <div className="ml-7 space-y-2">
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] tracking-wide text-text-muted font-mono">
            {building.year}
          </span>
          <span className="text-[10px] text-text-subtle">·</span>
          <span className="text-[10px] tracking-wide text-text-muted font-mono">
            {building.style}
          </span>
        </div>

        <p className="text-[10px] tracking-wide text-text-subtle font-mono">
          {building.architect}
        </p>

        {isActive && (
          <div className="pt-1 space-y-2 animate-fade-in">
            <p className="text-xs text-text-muted leading-relaxed">
              {building.description}
            </p>
            <p className="text-[10px] text-text-subtle font-mono">
              {building.address}
            </p>
            {building.wiki && (
              <a
                href={building.wiki}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block text-[10px] font-mono tracking-wide text-text-subtle hover:text-text transition-colors underline underline-offset-2"
              >
                Wikipedia
              </a>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
