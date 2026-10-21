/**
 * VENUE MANAGEMENT BOILERPLATE MOCK DATABASE
 * Handles dashboard data: active areas, access logs, orders, revenue, promos, staff, and venue profile.
 */

export const MOCK_CAFES_DB = [
  {
    id: 'cafe_101',
    name: 'Örnek Mekân 101',
    ownerName: 'Örnek İşletmeci',
    phone: '0555 000 00 01',
    email: 'mekan101@example.com',
    city: 'istanbul',
    cityName: 'İstanbul',
    district: 'Merkez',
    address: 'Örnek Cad. No:10, Merkez',
    status: 'approved',
    submittedAt: '2026-07-20T10:30:00Z',
    approvedAt: '2026-07-21T14:15:00Z',
    rating: 4.9,
    reviewCount: 42,
    tableCount: 12,
    todayRevenue: 12500,
    monthRevenue: 98000,
    commissionRate: 0.02,
    photos: [
      'images/placeholder.svg',
      'images/placeholder.svg'
    ],
    features: ['Standart Alan', 'Özel Salon', 'Otopark', 'Havalandırma', 'İkram'],
    workingHours: 'Hafta içi & Hafta sonu: 09:00 - 01:00',
    description: 'Modern, yüksek standartlara sahip konforlu ve ferah mekân ortamı.',
    activeTables: [
      {
        id: 'tbl_n1',
        name: 'Masa 1 — Özel Bölüm',
        gameType: 'Klasik Kategori',
        mode: 'Eşli',
        status: 'Devam Ediyor',
        startTimeSeconds: Math.floor(Date.now() / 1000) - 3600,
        adisyonTotal: 350,
        players: [
          { username: 'kullanici_1', avatar: 'K', trustScore: 98, realName: 'Örnek Kullanıcı 1', phone: '0555 111 22 33' },
          { username: 'kullanici_2', avatar: 'M', trustScore: 95, realName: 'Örnek Kullanıcı 2', phone: '0555 222 33 44' },
          { username: 'kullanici_3', avatar: 'C', trustScore: 99, realName: 'Örnek Kullanıcı 3', phone: '0555 333 44 55' },
          { username: 'kullanici_4', avatar: 'D', trustScore: 97, realName: 'Örnek Kullanıcı 4', phone: '0555 444 55 66' }
        ]
      }
    ],
    accessLogs: [],
    adisyonHistory: [
      { id: 'ad_881', table: 'Masa 1 — Özel Bölüm', items: 'Örnek İçecek x2, Örnek İkram x1', amount: 350, time: '21:00', status: 'Ödendi' }
    ],
    reviews: [
      { id: 'rev_1', user: 'Örnek Ziyaretçi', rating: 5, date: 'Dün', comment: 'Hizmet ve ortam son derece kaliteli.' }
    ],
    starDistribution: { 5: 35, 4: 5, 3: 2, 2: 0, 1: 0 },
    promotions: [
      {
        id: 'p_2',
        title: 'Örnek Promosyon Kampanyası',
        description: 'Belirli saatler arasında geçerli özel indirim avantajı.',
        validityDate: '2026-12-31',
        status: 'pending_approval',
        createdAt: '2026-08-01'
      }
    ],
    staffList: []
  }
];

export function saveCafesToStorage() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('HADIN_CAFES_DB', JSON.stringify(MOCK_CAFES_DB));
  }
}

export function loadCafesFromStorage() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('HADIN_CAFES_DB');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          MOCK_CAFES_DB.length = 0;
          MOCK_CAFES_DB.push(...parsed);
        }
      } catch (e) {}
    }
  }
}

loadCafesFromStorage();

export function submitCafeApplication(formData) {
  const newApp = {
    id: `cafe_${Date.now()}`,
    name: formData.name || 'İsimsiz Kafe',
    ownerName: formData.ownerName || 'İşletmeci',
    phone: formData.phone || '',
    email: formData.email || '',
    city: formData.city || 'istanbul',
    cityName: formData.cityName || 'İstanbul',
    district: formData.district || 'Merkez',
    address: formData.address || '',
    tableCount: parseInt(formData.tableCount) || 10,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    approvedAt: null,
    trackingCode: `TRK-${Math.floor(10000 + Math.random() * 90000)}`,
    photos: formData.photos && formData.photos.length > 0 ? formData.photos : [
      'images/placeholder.svg'
    ],
    features: formData.features || ['Standart Alan', 'İçecek Servisi'],
    todayRevenue: 0,
    monthRevenue: 0,
    commissionRate: 0.02,
    activeTables: [],
    accessLogs: [],
    adisyonHistory: [],
    reviews: [],
    starDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    promotions: [],
    staffList: []
  };

  MOCK_CAFES_DB.unshift(newApp);
  saveCafesToStorage();
  return newApp;
}

export function loginCafe(phoneOrEmail) {
  loadCafesFromStorage();
  const query = (phoneOrEmail || '').trim().toLowerCase();
  if (!query) {
    return { success: false, reason: 'Lütfen telefon numarası veya e-posta adresinizi girin.' };
  }

  const cleanQuery = query.replace(/\s+/g, '');
  if (!cleanQuery) {
    return { success: false, reason: 'Lütfen geçerli bir telefon numarası veya e-posta adresi girin.' };
  }

  const found = MOCK_CAFES_DB.find(c => 
    (c.email && c.email.toLowerCase() === query) || 
    (c.phone && c.phone.replace(/\s+/g, '') === cleanQuery)
  );

  if (!found) {
    return { 
      success: false, 
      reason: 'Bu telefon numarası veya e-posta ile kayıtlı bir mekân bulunamadı. Lütfen önce başvuru yapın.' 
    };
  }

  if (found.status === 'pending') {
    return { 
      success: false, 
      isPending: true,
      cafe: found,
      reason: 'Başvurunuz henüz inceleme aşamasındadır. Genellikle 1-2 iş günü içinde dönüş yapılmaktadır.' 
    };
  }

  if (found.status === 'rejected') {
    return {
      success: false,
      reason: `Mekân başvurunuz reddedilmiştir. Gerekçe: ${found.rejectionReason || 'Belgeler yetersiz ve platform kurallarına aykırı.'}`
    };
  }

  if (found.status === 'suspended') {
    return {
      success: false,
      reason: `Mekân hesabınız askıya alınmıştır. Gerekçe: ${found.suspensionReason || 'Sözleşme ihlali.'}`
    };
  }

  return { success: true, cafe: found };
}

/**
 * Logs an emergency access request when cafe owner requests player phone/real name.
 */
export function logEmergencyAccess(cafeId, tableId, reason, user = 'Kafe Sahibi') {
  const cafe = MOCK_CAFES_DB.find(c => c.id === cafeId);
  if (!cafe) return null;

  const table = cafe.activeTables.find(t => t.id === tableId);
  const logEntry = {
    id: `log_${Date.now()}`,
    tableId: tableId,
    tableName: table ? table.name : 'Bilinmeyen Masa',
    timestamp: new Date().toISOString(),
    reason: reason,
    accessedBy: user
  };

  if (!cafe.accessLogs) cafe.accessLogs = [];
  cafe.accessLogs.unshift(logEntry);
  saveCafesToStorage();
  return logEntry;
}

/**
 * Adds a new promotion to the cafe's list with 'pending_approval' status.
 */
export function addPromotion(cafeId, promoData) {
  const cafe = MOCK_CAFES_DB.find(c => c.id === cafeId);
  if (!cafe) return null;

  const newPromo = {
    id: `p_${Date.now()}`,
    title: promoData.title,
    description: promoData.description,
    validityDate: promoData.validityDate,
    status: 'pending_approval', // Sent to Admin approval queue
    createdAt: new Date().toISOString().split('T')[0]
  };

  if (!cafe.promotions) cafe.promotions = [];
  cafe.promotions.unshift(newPromo);
  saveCafesToStorage();
  return newPromo;
}

/**
 * Adds a staff member to the cafe account.
 */
export function addStaff(cafeId, staffData) {
  const cafe = MOCK_CAFES_DB.find(c => c.id === cafeId);
  if (!cafe) return null;

  const newStaff = {
    id: `st_${Date.now()}`,
    name: staffData.name,
    role: staffData.role,
    phone: staffData.phone,
    addedAt: new Date().toISOString().split('T')[0]
  };

  if (!cafe.staffList) cafe.staffList = [];
  cafe.staffList.unshift(newStaff);
  saveCafesToStorage();
  return newStaff;
}

export function updateCafeProfileInDB(cafeId, data) {
  const cafe = MOCK_CAFES_DB.find(c => c.id === cafeId);
  if (!cafe) return false;

  if (data.name) cafe.name = data.name;
  if (data.ownerName) cafe.ownerName = data.ownerName;
  if (data.phone) cafe.phone = data.phone;
  if (data.cityName) cafe.cityName = data.cityName;
  if (data.district) cafe.district = data.district;
  if (data.address) cafe.address = data.address;
  if (data.tableCount) cafe.tableCount = parseInt(data.tableCount);

  saveCafesToStorage();
  return true;
}

export function updateCafeCommissionInDB(cafeId, newRate) {
  const cafe = MOCK_CAFES_DB.find(c => c.id === cafeId);
  if (!cafe) return false;

  cafe.commissionRate = parseFloat(newRate);
  saveCafesToStorage();
  return true;
}

export function suspendCafeInDB(cafeId, reason) {
  const cafe = MOCK_CAFES_DB.find(c => c.id === cafeId);
  if (!cafe) return false;

  cafe.status = 'suspended';
  cafe.suspensionReason = reason;
  saveCafesToStorage();
  return true;
}
