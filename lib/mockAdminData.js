/**
 * UNIFIED ADMIN DATA STORE (BOILERPLATE)
 * Bridges `mockData.js` and `mockCafeData.js` into a single shared state.
 */

import { MOCK_CAFES_DB, loadCafesFromStorage, saveCafesToStorage } from './mockCafeData.js';
import { MOCK_LEADERBOARD, MOCK_TABLES, INITIAL_USER_PROFILE } from './mockData.js';

// ALL REGISTERED USERS DATABASE WITH TRUST SCORE LOGS AND ADMIN ACTIONS
export const MOCK_USERS_DB = [
  {
    id: 'usr_101',
    username: 'kullanici_1',
    fullName: 'Örnek Kullanıcı 1',
    phone: '0555 111 22 33',
    city: 'İstanbul',
    registeredAt: '2026-03-14',
    trustScore: 98,
    status: 'aktif', // 'aktif' | 'uyarılı' | 'banlı'
    gamesPlayed: 142,
    winRate: '%68',
    trustScoreLogs: [
      { date: '2026-07-15', change: '+5', reason: 'Örnek kullanıcı rozeti' },
      { date: '2026-07-28', change: '-2', reason: 'Bağlantı kopması nedeniyle erken ayrılma' },
      { date: '2026-08-01', change: '+3', reason: 'Olumlu kullanıcı değerlendirmeleri' }
    ],
    adminActionLogs: []
  },
  {
    id: 'usr_102',
    username: 'kullanici_2',
    fullName: 'Örnek Kullanıcı 2',
    phone: '0555 222 33 44',
    city: 'İstanbul',
    registeredAt: '2026-04-02',
    trustScore: 95,
    status: 'aktif',
    gamesPlayed: 98,
    winRate: '%62',
    trustScoreLogs: [
      { date: '2026-07-10', change: '+5', reason: 'Düzenli katılım' }
    ],
    adminActionLogs: []
  },
  {
    id: 'usr_103',
    username: 'kullanici_3',
    fullName: 'Örnek Kullanıcı 3',
    phone: '0555 333 44 55',
    city: 'Ankara',
    registeredAt: '2026-05-19',
    trustScore: 99,
    status: 'aktif',
    gamesPlayed: 210,
    winRate: '%74',
    trustScoreLogs: [
      { date: '2026-06-01', change: '+10', reason: 'Yüksek puan ve başarı rozeti' }
    ],
    adminActionLogs: []
  },
  {
    id: 'usr_104',
    username: 'ornek_ihlal',
    fullName: 'Örnek İhlal Kullanıcısı',
    phone: '0555 000 11 22',
    city: 'İzmir',
    registeredAt: '2026-07-20',
    trustScore: 45,
    status: 'uyarılı',
    gamesPlayed: 14,
    winRate: '%20',
    trustScoreLogs: [
      { date: '2026-07-25', change: '-30', reason: 'Uygunsuz üslup bildirimi' },
      { date: '2026-07-29', change: '-25', reason: 'Oturumu kasıtlı terk etme' }
    ],
    adminActionLogs: [
      { date: '2026-07-25', action: 'Uyarı', reason: 'Kural ihlali nedeniyle ilk yazılı uyarı verildi.', admin: 'admin' }
    ]
  }
];

// USER COMPLAINTS, SCORE APPEALS & VENUE COMPLAINTS DATABASE
export const MOCK_COMPLAINTS = [
  {
    id: 'cmp_201',
    type: 'user_report', // 'user_report' | 'score_appeal' | 'cafe_complaint'
    complainant: 'kullanici_2',
    reportedSubject: 'ornek_ihlal (Kullanıcı)',
    tableTitle: 'Masa 1 — Özel Bölüm',
    cafeName: 'Örnek Mekân 101',
    reason: 'Sohbette kurallara aykırı uygunsuz ifadeler kullandı.',
    status: 'Bekliyor', // 'Bekliyor' | 'İnceleniyor' | 'Çözüldü' | 'Reddedildi'
    createdAt: '2026-08-04T18:10:00Z',
    adminNote: ''
  },
  {
    id: 'cmp_202',
    type: 'score_appeal',
    complainant: 'kullanici_3',
    reportedSubject: 'Puan Düşüşü (-25 Puan)',
    tableTitle: 'Masa 2 — Salon Masası',
    cafeName: 'Örnek Mekân 101',
    reason: 'Teknik kesinti nedeniyle oturum kapandı, puan iadesi talep ediliyor.',
    status: 'İnceleniyor',
    createdAt: '2026-08-04T19:45:00Z',
    adminNote: 'Sistem logları inceleniyor.'
  },
  {
    id: 'cmp_203',
    type: 'cafe_complaint',
    complainant: 'kullanici_1',
    reportedSubject: 'Örnek Mekân 101 (Mekân)',
    tableTitle: 'Masa 3 — Bahçe',
    cafeName: 'Örnek Mekân 101',
    reason: 'Hizmet kalitesi ve sipariş detayı ile ilgili bildirim.',
    status: 'Bekliyor',
    createdAt: '2026-08-04T20:15:00Z',
    adminNote: ''
  }
];

/**
 * Calculates live platform metrics by reading shared mock databases.
 */
export function getAdminMetrics() {
  loadCafesFromStorage();
  const totalPlayers = MOCK_USERS_DB.length + 1840; // Base count + live DB
  const newPlayersThisWeek = 142;

  const approvedCafes = MOCK_CAFES_DB.filter(c => c.status === 'approved').length;
  const pendingCafes = MOCK_CAFES_DB.filter(c => c.status === 'pending').length;

  let liveTablesCount = 0;
  let totalGrossRevenue = 0;
  MOCK_CAFES_DB.forEach(c => {
    if (c.status === 'approved') {
      liveTablesCount += (c.activeTables ? c.activeTables.filter(t => t.status !== 'Kapandı').length : 0);
      totalGrossRevenue += (c.monthRevenue || 124500);
    }
  });

  if (typeof localStorage !== 'undefined') {
    const savedTablesStr = localStorage.getItem('HADIN_TABLES_DB');
    if (savedTablesStr) {
      try {
        const playerTables = JSON.parse(savedTablesStr);
        playerTables.forEach(pt => {
          let existsInCafe = false;
          MOCK_CAFES_DB.forEach(c => {
            if (c.activeTables && c.activeTables.some(bt => bt.id === pt.id)) existsInCafe = true;
          });
          if (!existsInCafe) liveTablesCount++;
        });
      } catch(e) {}
    }
  }

  const platformCommission = Math.round(totalGrossRevenue * 0.02);

  // Count pending promos across cafes
  let pendingPromosCount = 0;
  MOCK_CAFES_DB.forEach(c => {
    if (c.promotions) {
      pendingPromosCount += c.promotions.filter(p => p.status === 'pending_approval').length;
    }
  });

  const pendingComplaintsCount = MOCK_COMPLAINTS.filter(c => c.status === 'pending').length;

  return {
    totalPlayers,
    newPlayersThisWeek,
    approvedCafes,
    pendingCafes,
    liveTablesCount,
    totalGrossRevenue,
    platformCommission,
    pendingComplaintsCount,
    pendingPromosCount
  };
}

/**
 * Approves a cafe application in MOCK_CAFES_DB.
 */
export function approveCafeApplication(cafeId) {
  loadCafesFromStorage();
  const cafe = MOCK_CAFES_DB.find(c => c.id === cafeId);
  if (!cafe) return false;

  cafe.status = 'approved';
  cafe.approvedAt = new Date().toISOString();
  saveCafesToStorage();
  return true;
}

/**
 * Rejects a cafe application in MOCK_CAFES_DB.
 */
export function rejectCafeApplication(cafeId, reason) {
  loadCafesFromStorage();
  const cafe = MOCK_CAFES_DB.find(c => c.id === cafeId);
  if (!cafe) return false;

  cafe.status = 'rejected';
  cafe.rejectionReason = reason;
  saveCafesToStorage();
  return true;
}

/**
 * Issues an administrative warning to a player with mandatory reason logging.
 */
export function adminWarnUser(userId, reason) {
  const user = MOCK_USERS_DB.find(u => u.id === userId);
  if (!user) return false;

  user.status = 'uyarılı';
  user.trustScore = Math.max(0, user.trustScore - 10);
  user.trustScoreLogs.unshift({
    date: new Date().toISOString().split('T')[0],
    change: '-10',
    reason: `Admin Uyarısı: ${reason}`
  });

  user.adminActionLogs.unshift({
    date: new Date().toISOString().split('T')[0],
    action: 'Uyarı',
    reason: reason,
    admin: 'admin'
  });

  return true;
}

/**
 * Temporarily or Permanently bans a player with mandatory reason logging.
 */
export function adminBanUser(userId, banType, durationDays, reason) {
  const user = MOCK_USERS_DB.find(u => u.id === userId);
  if (!user) return false;

  user.status = 'banlı';
  user.banDetails = {
    isBanned: true,
    type: banType, // 'Geçici' | 'Kalıcı'
    durationDays: durationDays || 'Süresiz',
    bannedAt: new Date().toISOString(),
    reason: reason
  };

  user.trustScore = Math.max(0, user.trustScore - 30);
  user.trustScoreLogs.unshift({
    date: new Date().toISOString().split('T')[0],
    change: '-30',
    reason: `${banType} Ban Uygulandı: ${reason}`
  });

  user.adminActionLogs.unshift({
    date: new Date().toISOString().split('T')[0],
    action: `${banType} Ban (${durationDays ? durationDays + ' Gün' : 'Süresiz'})`,
    reason: reason,
    admin: 'admin'
  });

  return true;
}

/**
 * Manually overrides a user's username with mandatory reason logging.
 */
export function adminOverrideUsername(userId, newUsername, reason) {
  const user = MOCK_USERS_DB.find(u => u.id === userId);
  if (!user) return false;

  const oldUsername = user.username;
  user.username = newUsername.trim().toLowerCase();

  user.adminActionLogs.unshift({
    date: new Date().toISOString().split('T')[0],
    action: `Kullanıcı Adı Değiştirildi (@${oldUsername} ➔ @${user.username})`,
    reason: reason,
    admin: 'admin'
  });

  return true;
}

/**
 * Approves a cafe promotion/announcement in MOCK_CAFES_DB.
 */
export function approveCafePromo(cafeId, promoId) {
  const cafe = MOCK_CAFES_DB.find(c => c.id === cafeId);
  if (!cafe || !cafe.promotions) return false;

  const promo = cafe.promotions.find(p => p.id === promoId);
  if (!promo) return false;

  promo.status = 'published';
  saveCafesToStorage();
  return true;
}

export function rejectCafePromo(cafeId, promoId, reason) {
  const cafe = MOCK_CAFES_DB.find(c => c.id === cafeId);
  if (!cafe || !cafe.promotions) return false;

  const promo = cafe.promotions.find(p => p.id === promoId);
  if (!promo) return false;

  promo.status = 'rejected';
  promo.rejectionReason = reason;
  saveCafesToStorage();
  return true;
}

export function saveComplaintsToStorage() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('HADIN_COMPLAINTS_DB', JSON.stringify(MOCK_COMPLAINTS));
  }
}

export function loadComplaintsFromStorage() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('HADIN_COMPLAINTS_DB');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          MOCK_COMPLAINTS.length = 0;
          MOCK_COMPLAINTS.push(...parsed);
        }
      } catch (e) {}
    }
  }
}

loadComplaintsFromStorage();

export function updateComplaintStatus(complaintId, newStatus, adminNote) {
  loadComplaintsFromStorage();
  const comp = MOCK_COMPLAINTS.find(c => c.id === complaintId);
  if (!comp) return false;

  comp.status = newStatus;
  comp.adminNote = adminNote || '';
  saveComplaintsToStorage();
  return true;
}

// SECTION 7: REWARDS & CHAMPIONS DATABASE
export const MOCK_REWARDS_DB = [
  {
    id: 'rw_1',
    period: '2026 Ağustos 1. Hafta',
    city: 'İstanbul',
    winner: 'kullanici_1',
    rewardType: 'Özel Ödül Paketi',
    amount: 'Aylık VIP Üyelik',
    status: 'Teslim Edildi',
    createdAt: '2026-08-01'
  },
  {
    id: 'rw_2',
    period: '2026 Temmuz Ayı Şampiyonu',
    city: 'Genel (Türkiye)',
    winner: 'kullanici_3',
    rewardType: 'Hediye Çeki',
    amount: '₺1,000 Hediye Çeki',
    status: 'Teslim Edildi',
    createdAt: '2026-07-31'
  }
];

export function addReward(rewardData) {
  const newReward = {
    id: `rw_${Date.now()}`,
    period: rewardData.period,
    city: rewardData.city,
    winner: rewardData.winner || 'Belirlenecek',
    rewardType: rewardData.rewardType,
    amount: rewardData.amount,
    status: 'Gönderimde',
    createdAt: new Date().toISOString().split('T')[0]
  };
  MOCK_REWARDS_DB.unshift(newReward);
  return newReward;
}

// SECTION 8: GLOBAL COMMISSION RATE & LOGS
export let GLOBAL_COMMISSION_RATE = 0.02; // Default 2%

export const MOCK_COMMISSION_LOGS = [
  {
    id: 'clog_1',
    timestamp: '2026-07-01 10:00',
    admin: 'admin',
    target: 'Genel Sistem',
    oldRate: '%1.5',
    newRate: '%2.0',
    reason: 'Platform lansmanı sonrası standart oran güncellemesi'
  }
];

export function updateGlobalCommissionRate(newRate, reason) {
  const oldStr = `%${(GLOBAL_COMMISSION_RATE * 100).toFixed(1)}`;
  GLOBAL_COMMISSION_RATE = parseFloat(newRate);
  const newStr = `%${(GLOBAL_COMMISSION_RATE * 100).toFixed(1)}`;

  MOCK_COMMISSION_LOGS.unshift({
    id: `clog_${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    admin: 'admin',
    target: 'Genel Sistem',
    oldRate: oldStr,
    newRate: newStr,
    reason: reason || 'Genel oran güncellemesi'
  });

  return true;
}

// SECTION 9: CITY STATS & RISK REPORT
export const MOCK_CITY_STATS = [
  { city: 'İstanbul', playerSeats: 1120, approvedCafes: 2, grossRevenue: 84500, commission: 1690 },
  { city: 'Ankara', playerSeats: 430, approvedCafes: 1, grossRevenue: 28000, commission: 560 },
  { city: 'İzmir', playerSeats: 210, approvedCafes: 0, grossRevenue: 12000, commission: 240 },
  { city: 'Konya', playerSeats: 84, approvedCafes: 0, grossRevenue: 0, commission: 0 }
];

export function getRiskReports() {
  const riskyUsers = MOCK_USERS_DB.filter(u => u.trustScore < 70 || u.status === 'uyarılı');
  const riskyCafes = MOCK_CAFES_DB.filter(c => (c.accessLogs && c.accessLogs.length > 2) || c.status === 'suspended');
  return { riskyUsers, riskyCafes };
}
