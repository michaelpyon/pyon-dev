import { useState } from 'react';

export default function SearchBar({ onSelectArtist, loading }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    setSuggestions([]);

    try {
      const res = await fetch(`/api/search-artist?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.artists?.length) {
        setSuggestions(data.artists);
      } else {
        setSuggestions([]);
      }
    } catch {
      setSuggestions([]);
    } finally {
      setSearching(false);
    }
  }

  function selectArtist(artist) {
    setSuggestions([]);
    setQuery(artist.name);
    onSelectArtist(artist);
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an artist..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={searching || loading || !query.trim()}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-colors"
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="mt-2 bg-gray-900/95 backdrop-blur border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          {suggestions.map((artist) => (
            <li key={artist.mbid}>
              <button
                onClick={() => selectArtist(artist)}
                className="w-full text-left px-5 py-3 hover:bg-white/10 transition-colors text-white"
              >
                <span className="font-medium">{artist.name}</span>
                {artist.disambiguation && (
                  <span className="text-white/50 text-sm ml-2">
                    ({artist.disambiguation})
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
