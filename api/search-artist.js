export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  const apiKey = process.env.SETLISTFM_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'SETLISTFM_API_KEY not configured' });
  }

  try {
    const response = await fetch(
      `https://api.setlist.fm/rest/1.0/search/artists?artistName=${encodeURIComponent(q)}&p=1&sort=relevance`,
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
    const artists = (data.artist || []).map((a) => ({
      mbid: a.mbid,
      name: a.name,
      disambiguation: a.disambiguation || '',
      sortName: a.sortName,
    }));

    return res.status(200).json({ artists });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
