/**
 * BOILERPLATE MOCK DATA STORE FOR DASHBOARD & LEAFLET MAP
 */

export const CITIES = [
  { id: 'istanbul', name: 'İSTANBUL', code: '34', activeTables: 24, coords: [41.0082, 28.9784] },
  { id: 'ankara', name: 'ANKARA', code: '06', activeTables: 16, coords: [39.9334, 32.8597] },
  { id: 'izmir', name: 'İZMİR', code: '35', activeTables: 12, coords: [38.4237, 27.1428] },
  { id: 'bursa', name: 'BURSA', code: '16', activeTables: 8, coords: [40.1885, 29.0610] },
  { id: 'antalya', name: 'ANTALYA', code: '07', activeTables: 6, coords: [36.8969, 30.7133] },
  { id: 'konya', name: 'KONYA', code: '42', activeTables: 9, coords: [37.8715, 32.4988] }
];

export const MOCK_CAFES = [
  {
    id: 'c1',
    name: "Örnek Mekân A",
    city: 'istanbul',
    district: 'Merkez',
    rating: 4.9,
    address: 'Örnek Caddesi No:10',
    image: 'images/placeholder.svg',
    lat: 41.0505,
    lng: 28.9912,
    amenities: "Özel Alan,İkram,Otopark",
    description: "Merkezi konumda, modern ve konforlu etkinlik alanı."
  },
  {
    id: 'c2',
    name: "Örnek Mekân B",
    city: 'konya',
    district: 'Meram',
    rating: 4.8,
    address: 'Örnek Bulvarı No:45',
    image: 'images/placeholder.svg',
    lat: 37.8550,
    lng: 32.4480,
    amenities: "Teras,İkram,Vale",
    description: "Sakin ve ferah atmosferiyle öne çıkan buluşma noktası."
  },
  {
    id: 'c3',
    name: "Örnek Mekân C",
    city: 'ankara',
    district: 'Çankaya',
    rating: 4.7,
    address: 'Örnek Sokak No:22',
    image: 'images/placeholder.svg',
    lat: 39.9055,
    lng: 32.8610,
    amenities: "Geniş Salon,Hızlı Servis",
    description: "Şehrin merkezinde prestijli buluşma mekânı."
  },
  {
    id: 'c4',
    name: "Örnek Mekân D",
    city: 'izmir',
    district: 'Alsancak',
    rating: 4.8,
    address: 'Kordon Boyu No:18',
    image: 'images/placeholder.svg',
    lat: 38.4375,
    lng: 27.1420,
    amenities: "Manzara,Özel İçecekler",
    description: "Deniz esintisi eşliğinde keyifli oturma alanı."
  }
];

export const MOCK_TABLES = [
  {
    id: 't1',
    title: 'Örnek Etkinlik Masası 1',
    cafe: 'Örnek Mekân A',
    city: 'istanbul',
    district: 'Merkez',
    time: '20:30',
    gameType: 'Klasik Kategori',
    mode: 'Eşli',
    host: 'Örnek Kullanıcı 1',
    lat: 41.0512,
    lng: 28.9925,
    players: [
      { name: 'Kullanıcı A', avatar: 'A', level: 14, score: 98 },
      { name: 'Kullanıcı B', avatar: 'B', level: 11, score: 94 },
      { name: 'Kullanıcı C', avatar: 'C', level: 16, score: 99 },
      null // Empty seat
    ],
    status: 'bekliyor',
    isPulsing: true
  },
  {
    id: 't2',
    title: 'Örnek Etkinlik Masası 2',
    cafe: 'Örnek Mekân B',
    city: 'konya',
    district: 'Meram',
    time: '21:00',
    gameType: 'Hızlı Kategori',
    mode: 'Tekli',
    host: 'Örnek Kullanıcı 2',
    lat: 37.8562,
    lng: 32.4495,
    players: [
      { name: 'Kullanıcı D', avatar: 'D', level: 22, score: 100 },
      { name: 'Kullanıcı E', avatar: 'E', level: 19, score: 96 },
      null,
      null
    ],
    status: 'bekliyor',
    isPulsing: true
  },
  {
    id: 't3',
    title: 'Örnek Etkinlik Masası 3',
    cafe: 'Örnek Mekân C',
    city: 'ankara',
    district: 'Çankaya',
    time: '22:00',
    gameType: 'Klasik Kategori',
    mode: 'Eşli',
    host: 'Örnek Kullanıcı 3',
    lat: 39.9065,
    lng: 32.8625,
    players: [
      { name: 'Kullanıcı F', avatar: 'F', level: 18, score: 97 },
      { name: 'Kullanıcı G', avatar: 'G', level: 15, score: 95 },
      { name: 'Kullanıcı H', avatar: 'H', level: 20, score: 98 },
      { name: 'Kullanıcı I', avatar: 'I', level: 17, score: 96 }
    ],
    status: 'dolu',
    isPulsing: false
  }
];

export const MOCK_INVITATIONS = [
  {
    id: 'inv1',
    from: 'Örnek Davet Eden',
    avatar: 'D',
    cafe: "Örnek Mekân A",
    time: 'Bu Akşam — 21:00',
    gameType: 'Klasik Kategori',
    lat: 41.0495,
    lng: 28.9895
  }
];

export const MOCK_LIVE_GAMES = [
  {
    id: 'g1',
    title: 'Örnek Mekân A — Canlı Oturum #1',
    cafe: 'Örnek Mekân A',
    duration: '00:35:00',
    round: '2 / 5',
    leadPlayer: 'Kullanıcı C',
    players: ['Kullanıcı A', 'Kullanıcı B', 'Kullanıcı C', 'Kullanıcı D']
  }
];

export const MOCK_GAME_HISTORY = [
  {
    id: 'h1',
    date: '3 Ağustos 2026',
    cafe: 'Örnek Mekân A',
    gameType: 'Klasik Kategori',
    result: 'Kazandı',
    scoreChange: '+45 PTS',
    duration: '1s 10dk'
  },
  {
    id: 'h2',
    date: '1 Ağustos 2026',
    cafe: 'Örnek Mekân B',
    gameType: 'Hızlı Kategori',
    result: 'İkinci',
    scoreChange: '+15 PTS',
    duration: '45dk'
  },
  {
    id: 'h3',
    date: '28 Temmuz 2026',
    cafe: 'Örnek Mekân C',
    gameType: 'Klasik Kategori',
    result: 'Kaybetti',
    scoreChange: '-10 PTS',
    duration: '1s 00dk'
  }
];

export const MOCK_MESSAGES = [
  {
    id: 'm1',
    sender: 'Örnek Kullanıcı',
    avatar: 'K',
    text: 'Selam! Akşamki etkinlik masasında yerin hazır.',
    time: '19:40',
    isUser: false
  },
  {
    id: 'm2',
    sender: 'Siz',
    avatar: 'S',
    text: 'Harika, tam vaktinde orada olacağım!',
    time: '19:42',
    isUser: true
  }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Örnek Lider 1', username: 'lider_1', city: 'İstanbul', points: 4850, badge: 'Zirve Ustası' },
  { rank: 2, name: 'Örnek Lider 2', username: 'lider_2', city: 'Konya', points: 4420, badge: 'Bölge Şampiyonu' },
  { rank: 3, name: 'Örnek Lider 3', username: 'lider_3', city: 'Ankara', points: 4190, badge: 'Aktif Katılımcı' },
  { rank: 4, name: 'Örnek Lider 4', username: 'lider_4', city: 'İstanbul', points: 3980, badge: 'Stratejist' },
  { rank: 5, name: 'Örnek Lider 5', username: 'lider_5', city: 'İzmir', points: 3750, badge: 'Kıdemli Üye' }
];

export const INITIAL_USER_PROFILE = {
  name: 'Örnek Kullanıcı',
  username: 'ornek_kullanici',
  city: 'İSTANBUL',
  avatar: null,
  level: 12,
  trustScore: 98,
  totalGames: 48,
  winRate: '68%',
  wins: 33,
  losses: 15,
  badges: ['Örnek Rozet 1', 'Müdavim Rozeti', 'İlk Kayıt']
};

export function saveTablesToStorage(tables) {
  if (typeof localStorage !== 'undefined') {
    const target = tables || MOCK_TABLES;
    if (tables && Array.isArray(tables)) {
      MOCK_TABLES.length = 0;
      MOCK_TABLES.push(...tables);
    }
    localStorage.setItem('HADIN_TABLES_DB', JSON.stringify(target));
  }
}

export function loadTablesFromStorage() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('HADIN_TABLES_DB');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          MOCK_TABLES.length = 0;
          MOCK_TABLES.push(...parsed);
        }
      } catch (e) {}
    }
  }
}

loadTablesFromStorage();
