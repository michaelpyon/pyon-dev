export default function Playlist({ artist, results, playlistUrl, onReset }) {
  const found = results.filter((r) => r.videoId);
  const notFound = results.filter((r) => !r.videoId);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Playlist</h2>
          <p className="text-white/50 text-sm mt-1">
            {found.length} of {results.length} songs found on YouTube
          </p>
        </div>
        <div className="flex gap-3">
          {playlistUrl && (
            <a
              href={playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold text-sm transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                <path d="M9.545 15.568V8.432L15.818 12z" fill="#fff" />
              </svg>
              Play All on YouTube
            </a>
          )}
          <button
            onClick={onReset}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold text-sm transition-colors"
          >
            New Search
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {found.map((item, i) => (
          <a
            key={item.videoId}
            href={`https://www.youtube.com/watch?v=${item.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
          >
            <span className="text-white/30 text-sm font-mono w-6 text-right shrink-0">
              {i + 1}
            </span>
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt=""
                className="w-20 h-14 object-cover rounded-lg shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="text-white font-medium truncate group-hover:text-purple-300 transition-colors">
                {item.song}
              </div>
              <div className="text-white/40 text-sm truncate">{item.title}</div>
            </div>
            <svg className="w-5 h-5 text-white/30 group-hover:text-red-400 shrink-0 transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        ))}
      </div>

      {notFound.length > 0 && (
        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-white/50 text-sm font-medium mb-2">Not found on YouTube:</h3>
          <div className="flex flex-wrap gap-2">
            {notFound.map((item, i) => (
              <span key={i} className="text-xs bg-white/10 text-white/40 px-2 py-1 rounded-md">
                {item.song}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
