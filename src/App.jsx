import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SetlistPicker from './components/SetlistPicker'
import Playlist from './components/Playlist'

export default function App() {
  const [step, setStep] = useState('search')
  const [artist, setArtist] = useState(null)
  const [setlists, setSetlists] = useState([])
  const [playlist, setPlaylist] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSelectArtist(selectedArtist) {
    setArtist(selectedArtist)
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/setlists?mbid=${encodeURIComponent(selectedArtist.mbid)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setSetlists(data.setlists || [])
      setStep('setlists')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGeneratePlaylist(songs) {
    if (!songs.length) return
    setLoading(true)
    setError(null)

    try {
      const songsParam = songs.join('|')
      const res = await fetch(
        `/api/youtube-search?artist=${encodeURIComponent(artist.name)}&songs=${encodeURIComponent(songsParam)}`
      )
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setPlaylist(data)
      setStep('playlist')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setStep('search')
    setArtist(null)
    setSetlists([])
    setPlaylist(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white">
      <header className="pt-12 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
          Concert Prep
        </h1>
        <p className="mt-3 text-white/50 text-lg max-w-md mx-auto">
          Get ready for your next show. We'll find the likely setlist and build you a YouTube playlist to learn every song.
        </p>
      </header>

      {/* Progress steps */}
      <div className="flex justify-center gap-2 mb-10">
        {['Search', 'Setlists', 'Playlist'].map((label, i) => {
          const stepIndex = ['search', 'setlists', 'playlist'].indexOf(step)
          const isActive = i <= stepIndex
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  isActive ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/30'
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-sm hidden sm:inline transition-colors ${isActive ? 'text-white' : 'text-white/30'}`}>
                {label}
              </span>
              {i < 2 && (
                <div className={`w-8 h-0.5 ${i < stepIndex ? 'bg-purple-600' : 'bg-white/10'}`} />
              )}
            </div>
          )
        })}
      </div>

      <main className="px-6 pb-20">
        {error && (
          <div className="max-w-xl mx-auto mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {step === 'search' && (
          <div>
            <SearchBar onSelectArtist={handleSelectArtist} loading={loading} />
            {loading && (
              <div className="text-center mt-8 text-white/50">
                <div className="inline-block w-6 h-6 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
                <p className="mt-2">Loading setlists...</p>
              </div>
            )}
          </div>
        )}

        {step === 'setlists' && (
          <div>
            <div className="text-center mb-6">
              <button
                onClick={handleReset}
                className="text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                &larr; Back to search
              </button>
              <h2 className="text-lg text-white/70 mt-2">
                Showing setlists for <span className="text-white font-semibold">{artist?.name}</span>
              </h2>
            </div>
            <SetlistPicker
              setlists={setlists}
              onGeneratePlaylist={handleGeneratePlaylist}
              loading={loading}
            />
          </div>
        )}

        {step === 'playlist' && (
          <Playlist
            artist={artist?.name}
            results={playlist?.results || []}
            playlistUrl={playlist?.playlistUrl}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="text-center pb-8 text-white/20 text-xs">
        Powered by setlist.fm and YouTube
      </footer>
    </div>
  )
}
