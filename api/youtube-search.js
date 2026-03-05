export default async function handler(req, res) {
  const { artist, songs } = req.query;

  if (!artist || !songs) {
    return res.status(400).json({ error: 'Missing "artist" or "songs" parameter' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'YOUTUBE_API_KEY not configured' });
  }

  const songList = songs.split('|').slice(0, 30);

  try {
    const results = await Promise.all(
      songList.map(async (song) => {
        const query = `${artist} ${song} official`;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          return { song, videoId: null, title: null, error: 'Search failed' };
        }

        const data = await response.json();
        const item = data.items?.[0];

        if (!item) {
          return { song, videoId: null, title: null };
        }

        return {
          song,
          videoId: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails?.medium?.url || null,
          channel: item.snippet.channelTitle,
        };
      })
    );

    // Build a YouTube playlist URL from all found videos
    const videoIds = results.filter((r) => r.videoId).map((r) => r.videoId);
    let playlistUrl = null;
    if (videoIds.length > 0) {
      playlistUrl = `https://www.youtube.com/watch_videos?video_ids=${videoIds.join(',')}`;
    }

    return res.status(200).json({ results, playlistUrl });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
