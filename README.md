# Concert Prep

Know every song before the show. Search for an artist, see their recent setlists from [setlist.fm](https://www.setlist.fm/), and generate a YouTube playlist to prepare for your next concert.

## How It Works

1. **Search** for an artist by name
2. **Pick setlists** — select one or more recent shows to see what they've been playing
3. **Generate playlist** — we find each song on YouTube and give you a one-click playlist

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [setlist.fm API key](https://api.setlist.fm/docs/1.0/index.html) (free)
- A [YouTube Data API v3 key](https://console.cloud.google.com/apis/credentials) (free tier)

### Local Development

```bash
npm install
cp .env.example .env    # then fill in your API keys
npm run dev
```

### Deploy to Vercel

```bash
vercel
# Set environment variables in Vercel dashboard:
#   SETLISTFM_API_KEY
#   YOUTUBE_API_KEY
```

## Tech Stack

- **Frontend**: React 19, Tailwind CSS 4, Vite 7
- **Backend**: Vercel Serverless Functions
- **APIs**: setlist.fm REST API, YouTube Data API v3
