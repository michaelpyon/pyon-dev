export default async function handler(req, res) {
  const { mbid } = req.query;

  if (!mbid) {
    return res.status(400).json({ error: 'Missing query parameter "mbid"' });
  }

  const apiKey = process.env.SETLISTFM_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'SETLISTFM_API_KEY not configured' });
  }

  try {
    const response = await fetch(
      `https://api.setlist.fm/rest/1.0/artist/${encodeURIComponent(mbid)}/setlists?p=1`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    const setlists = (data.setlist || []).slice(0, 10).map((s) => ({
      id: s.id,
      eventDate: s.eventDate,
      venue: s.venue?.name || 'Unknown venue',
      city: s.venue?.city?.name || '',
      country: s.venue?.city?.country?.name || '',
      tour: s.tour?.name || '',
      songs: (s.sets?.set || []).flatMap((set) =>
        (set.song || []).map((song) => ({
          name: song.name,
          tape: song.tape || false,
          cover: song.cover?.name || null,
        }))
      ),
    }));

    return res.status(200).json({ setlists });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
