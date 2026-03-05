export default function NeighborhoodSelector({ walks, selected, onSelect }) {
  return (
    <nav className="flex gap-2 flex-wrap">
      {walks.map((walk) => (
        <button
          key={walk.id}
          onClick={() => onSelect(walk)}
          className={`
            px-3 py-1.5 rounded text-xs font-mono tracking-wide transition-all duration-200 border
            ${
              selected?.id === walk.id
                ? 'bg-white text-black border-white'
                : 'bg-transparent text-text-muted border-border hover:text-text hover:border-border-hover'
            }
          `}
        >
          {walk.neighborhood}
        </button>
      ))}
    </nav>
  );
}
