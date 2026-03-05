// Mock record store data for CrateDigger
// In production, this would come from Discogs/Google Places APIs

const stores = [
  // New York City
  {
    id: 1,
    name: "Rough Trade NYC",
    lat: 40.7218,
    lng: -73.9573,
    city: "Brooklyn, NY",
    neighborhood: "Williamsburg",
    genres: ["Indie Rock", "Post-Punk", "Shoegaze", "Electronic"],
    staffPick: {
      album: "Psychopomp",
      artist: "Japanese Breakfast",
      note: "Michelle Zauner's debut is a gorgeous blend of shoegaze and indie pop. Essential.",
    },
    rating: 4.8,
    address: "64 N 9th St, Brooklyn, NY 11249",
    vibe: "Massive space with a stage. The gold standard for indie record shops.",
  },
  {
    id: 2,
    name: "A1 Records",
    lat: 40.7282,
    lng: -73.9907,
    city: "New York, NY",
    neighborhood: "East Village",
    genres: ["Jazz", "Soul", "Funk", "Hip-Hop"],
    staffPick: {
      album: "Head Hunters",
      artist: "Herbie Hancock",
      note: "Funk meets jazz in the most perfect way. The pressing quality on the OG is unmatched.",
    },
    rating: 4.6,
    address: "439 E 6th St, New York, NY 10009",
    vibe: "Tiny, packed, and full of treasures. Bring patience and dig deep.",
  },
  {
    id: 3,
    name: "Academy Records",
    lat: 40.7366,
    lng: -73.9928,
    city: "New York, NY",
    neighborhood: "Union Square",
    genres: ["Classical", "Jazz", "Rock", "World"],
    staffPick: {
      album: "Kind of Blue",
      artist: "Miles Davis",
      note: "If you don't own this on vinyl yet, what are you even doing?",
    },
    rating: 4.5,
    address: "12 W 18th St, New York, NY 10011",
    vibe: "Classical and jazz paradise. Well-organized with fair prices.",
  },

  // London
  {
    id: 4,
    name: "Rough Trade East",
    lat: 51.5219,
    lng: -0.0733,
    city: "London, UK",
    neighborhood: "Shoreditch",
    genres: ["Indie", "Post-Punk", "Electronic", "Experimental"],
    staffPick: {
      album: "Unknown Pleasures",
      artist: "Joy Division",
      note: "The blueprint for post-punk. That Peter Hook bassline on 'She's Lost Control' is everything.",
    },
    rating: 4.7,
    address: "Old Truman Brewery, 91 Brick Ln, London E1 6QL",
    vibe: "The original Rough Trade. A pilgrimage site for music lovers.",
  },
  {
    id: 5,
    name: "Phonica Records",
    lat: 51.5148,
    lng: -0.1354,
    city: "London, UK",
    neighborhood: "Soho",
    genres: ["House", "Techno", "Disco", "Ambient"],
    staffPick: {
      album: "Selected Ambient Works 85-92",
      artist: "Aphex Twin",
      note: "Ambient techno perfection. Sounds even more alien on wax.",
    },
    rating: 4.8,
    address: "51 Poland St, London W1F 7LZ",
    vibe: "The DJ's record shop. Deep electronic cuts and knowledgeable staff.",
  },

  // Tokyo
  {
    id: 6,
    name: "Disk Union Shibuya",
    lat: 35.6595,
    lng: 139.7004,
    city: "Tokyo, Japan",
    neighborhood: "Shibuya",
    genres: ["J-Pop", "City Pop", "Jazz", "Rock"],
    staffPick: {
      album: "A Long Vacation",
      artist: "Eiichi Ohtaki",
      note: "The city pop masterpiece. Summer in vinyl form. Hunt for the original Niagara pressing.",
    },
    rating: 4.9,
    address: "30-7 Udagawacho, Shibuya City, Tokyo",
    vibe: "Seven floors of vinyl. Each floor is a different genre universe.",
  },
  {
    id: 7,
    name: "Jazzy Sport Shimokitazawa",
    lat: 35.6613,
    lng: 139.6680,
    city: "Tokyo, Japan",
    neighborhood: "Shimokitazawa",
    genres: ["Hip-Hop", "Jazz", "Neo-Soul", "Beats"],
    staffPick: {
      album: "Donuts",
      artist: "J Dilla",
      note: "The beat tape that changed everything. Every listen reveals something new.",
    },
    rating: 4.7,
    address: "2-34-8 Kitazawa, Setagaya City, Tokyo",
    vibe: "Beat culture HQ in Tokyo. The curation here is impeccable.",
  },

  // Berlin
  {
    id: 8,
    name: "Hard Wax",
    lat: 52.4986,
    lng: 13.4183,
    city: "Berlin, Germany",
    neighborhood: "Kreuzberg",
    genres: ["Techno", "Dub", "Dubstep", "Experimental"],
    staffPick: {
      album: "Untitled",
      artist: "Basic Channel",
      note: "Dub techno at its most hypnotic. The vinyl crackle IS the instrument.",
    },
    rating: 4.8,
    address: "Paul-Lincke-Ufer 44A, 10999 Berlin",
    vibe: "Legendary. Minimal aesthetic, maximum sonic depth. Listening stations are sacred.",
  },
  {
    id: 9,
    name: "OYE Records",
    lat: 52.5377,
    lng: 13.4099,
    city: "Berlin, Germany",
    neighborhood: "Prenzlauer Berg",
    genres: ["House", "Disco", "World", "Ambient"],
    staffPick: {
      album: "Music Has the Right to Children",
      artist: "Boards of Canada",
      note: "Nostalgic electronic music that sounds like fading memories. Beautiful on vinyl.",
    },
    rating: 4.6,
    address: "Oderberger Str. 4, 10435 Berlin",
    vibe: "Warm, inviting, and impeccably curated. Great for discovery.",
  },

  // Portland
  {
    id: 10,
    name: "Everyday Music",
    lat: 45.5231,
    lng: -122.6765,
    city: "Portland, OR",
    neighborhood: "Downtown",
    genres: ["Rock", "Indie", "Folk", "Grunge"],
    staffPick: {
      album: "In the Aeroplane Over the Sea",
      artist: "Neutral Milk Hotel",
      note: "Lo-fi perfection. Jeff Mangum's voice hits different through a good cartridge.",
    },
    rating: 4.4,
    address: "1313 W Burnside St, Portland, OR 97209",
    vibe: "Massive and chaotic in the best way. Dollar bins that actually deliver.",
  },

  // Melbourne
  {
    id: 11,
    name: "Northside Records",
    lat: -37.7963,
    lng: 144.9786,
    city: "Melbourne, Australia",
    neighborhood: "Fitzroy",
    genres: ["Psych Rock", "Garage", "Punk", "Electronic"],
    staffPick: {
      album: "Nonagon Infinity",
      artist: "King Gizzard & the Lizard Wizard",
      note: "Infinite loop of garage psych madness. The gator pressing is a grail.",
    },
    rating: 4.7,
    address: "236 Gertrude St, Fitzroy VIC 3065",
    vibe: "Heart of Melbourne's psych scene. The staff genuinely love music.",
  },

  // Paris
  {
    id: 12,
    name: "Souffle Continu",
    lat: 48.8661,
    lng: 2.3810,
    city: "Paris, France",
    neighborhood: "Belleville",
    genres: ["Krautrock", "Free Jazz", "Avant-Garde", "Prog"],
    staffPick: {
      album: "Tago Mago",
      artist: "Can",
      note: "Krautrock odyssey. 'Halleluhwah' is 18 minutes of motorik bliss.",
    },
    rating: 4.6,
    address: "20 Rue Gerbier, 75011 Paris",
    vibe: "The avant-garde collector's dream. Rare pressings and deep knowledge.",
  },

  // Kingston, Jamaica
  {
    id: 13,
    name: "Rockers International",
    lat: 18.0120,
    lng: -76.7936,
    city: "Kingston, Jamaica",
    neighborhood: "Orange Street",
    genres: ["Reggae", "Dub", "Ska", "Dancehall"],
    staffPick: {
      album: "Catch a Fire",
      artist: "Bob Marley & The Wailers",
      note: "The Island Records pressing with the Zippo sleeve. Reggae's gateway drug.",
    },
    rating: 4.5,
    address: "135 Orange St, Kingston",
    vibe: "Legendary shop on 'Beat Street.' Living reggae history.",
  },

  // Lagos
  {
    id: 14,
    name: "Jazzhole",
    lat: 6.4300,
    lng: 3.4218,
    city: "Lagos, Nigeria",
    neighborhood: "Ikoyi",
    genres: ["Afrobeat", "Highlife", "Jazz", "Afro-Funk"],
    staffPick: {
      album: "Zombie",
      artist: "Fela Kuti",
      note: "Political Afrobeat at its most incendiary. The Tony Allen drums are seismic.",
    },
    rating: 4.4,
    address: "168 Awolowo Rd, Ikoyi, Lagos",
    vibe: "Part bookshop, part record store. The Afrobeat collection is unreal.",
  },

  // Nashville
  {
    id: 15,
    name: "Third Man Records",
    lat: 36.1527,
    lng: -86.7768,
    city: "Nashville, TN",
    neighborhood: "Wedgewood-Houston",
    genres: ["Garage Rock", "Blues", "Country", "Punk"],
    staffPick: {
      album: "Elephant",
      artist: "The White Stripes",
      note: "Raw, loud, and perfect. 'Seven Nation Army' riff is a monument.",
    },
    rating: 4.7,
    address: "623 7th Ave S, Nashville, TN 37203",
    vibe: "Jack White's HQ. Direct-to-acetate recording booth in the store.",
  },

  // São Paulo
  {
    id: 16,
    name: "Locomotiva Discos",
    lat: -23.5505,
    lng: -46.6590,
    city: "São Paulo, Brazil",
    neighborhood: "Vila Madalena",
    genres: ["Tropicália", "MPB", "Bossa Nova", "Samba"],
    staffPick: {
      album: "Tropicália: ou Panis et Circenses",
      artist: "Various Artists",
      note: "The manifesto album. Gil, Caetano, Os Mutantes — all on one record.",
    },
    rating: 4.5,
    address: "Rua Fradique Coutinho, Vila Madalena, São Paulo",
    vibe: "Deep Brazilian music collection. MPB and Tropicália paradise.",
  },

  // Seoul
  {
    id: 17,
    name: "Dope Records",
    lat: 37.5563,
    lng: 126.9236,
    city: "Seoul, South Korea",
    neighborhood: "Hongdae",
    genres: ["K-Indie", "Hip-Hop", "Electronic", "Rock"],
    staffPick: {
      album: "HYYH: The Most Beautiful Moment in Life",
      artist: "BTS",
      note: "Before the stadium tours, there was this. K-pop's coming-of-age moment on wax.",
    },
    rating: 4.3,
    address: "Hongdae, Mapo-gu, Seoul",
    vibe: "Hongdae's vinyl outpost. K-indie and underground Korean music.",
  },

  // Havana
  {
    id: 18,
    name: "Longina Música",
    lat: 23.1365,
    lng: -82.3590,
    city: "Havana, Cuba",
    neighborhood: "Old Havana",
    genres: ["Son Cubano", "Salsa", "Rumba", "Latin Jazz"],
    staffPick: {
      album: "Buena Vista Social Club",
      artist: "Buena Vista Social Club",
      note: "Ry Cooder's Havana sessions. 'Chan Chan' is liquid gold on vinyl.",
    },
    rating: 4.3,
    address: "Calle Obispo, La Habana Vieja",
    vibe: "Tiny shop in Old Havana. Cuban music history on every shelf.",
  },
]

// Helper to find stores near a coordinate
export function findNearbyStores(lat, lng, radiusKm = 2000) {
  return stores
    .map((store) => ({
      ...store,
      distance: haversine(lat, lng, store.lat, store.lng),
    }))
    .filter((store) => store.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
}

// Haversine formula for distance between two points
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function toRad(deg) {
  return (deg * Math.PI) / 180
}

// Get genre summary for a region
export function getRegionGenres(stores) {
  const genreCount = {}
  stores.forEach((store) => {
    store.genres.forEach((g) => {
      genreCount[g] = (genreCount[g] || 0) + 1
    })
  })
  return Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .map(([genre]) => genre)
}

export default stores
