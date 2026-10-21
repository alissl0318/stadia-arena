/**
 * BANNED WORDS & PROFANITY FILTER MODULE
 * Supports leetspeak normalization, character mapping, and custom banned list.
 */

// Banned words list (profanity + system reserved names)
export const BANNED_WORDS = [
  'amk', 'aq', 'amq', 'amg', 'sik', 'siki', 'sikis', 'sikerim', 'sikti', 
  'orospu', 'oroç', 'orosbu', 'yarrak', 'yarag', 'yarak', 'göt', 'got', 
  'göte', 'ibne', 'ibine', 'piç', 'pic', 'kahpe', 'puşt', 'pust', 'dalyarak', 
  'tavşan', 'yavsak', 'yavşak', 'yarram', 'fuck', 'bitch', 'shit', 'asshole', 
  'cunt', 'dick', 'pussy', 'bastard', 'nigger', 'admin', 'moderator', 'mod', 
  'system_admin', 'system', 'root', 'null', 'undefined'
];

// Leetspeak & character normalization map
const NORMALIZATION_MAP = {
  '0': 'o',
  '1': 'i',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '@': 'a',
  '$': 's',
  'ı': 'i',
  'İ': 'i',
  'ğ': 'g',
  'Ğ': 'g',
  'ü': 'u',
  'Ü': 'u',
  'ş': 's',
  'Ş': 's',
  'ö': 'o',
  'Ö': 'o',
  'ç': 'c',
  'Ç': 'c'
};

/**
 * Normalizes username text by converting to lowercase and replacing leetspeak/accented characters.
 */
export function normalizeText(text) {
  if (!text) return '';
  let str = text.toLowerCase();
  let normalized = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    normalized += NORMALIZATION_MAP[char] || char;
  }
  return normalized;
}

/**
 * Validates a username against banned words.
 * Returns { valid: boolean, reason?: string }
 */
export function validateUsername(username) {
  if (!username || username.trim().length < 3) {
    return { valid: false, reason: 'Kullanıcı adı en az 3 karakter olmalıdır.' };
  }

  if (username.trim().length > 20) {
    return { valid: false, reason: 'Kullanıcı adı en fazla 20 karakter olabilir.' };
  }

  // Regex allowed characters: letters, numbers, dot, underscore
  const validPattern = /^[a-zA-Z0-9._]+$/;
  if (!validPattern.test(username.trim())) {
    return { valid: false, reason: 'Kullanıcı adı sadece harf, rakam, nokta ve alt çizgi içerebilir.' };
  }

  const normalized = normalizeText(username);

  // Check against BANNED_WORDS array
  for (const word of BANNED_WORDS) {
    if (!word) continue;
    const normalizedWord = normalizeText(word);
    if (normalized.includes(normalizedWord)) {
      return { valid: false, reason: 'Bu kullanıcı adını kullanamıyoruz, başka bir tane dene.' };
    }
  }

  return { valid: true };
}

/**
 * Auto-generates 3 clean username suggestions based on full name.
 */
export function generateUsernameSuggestions(fullName) {
  if (!fullName || !fullName.trim()) return ['kullanici', 'uye_yeni', 'profil_aktif'];

  const parts = fullName.trim().toLowerCase().split(/\s+/);
  const cleanParts = parts.map(p => normalizeText(p).replace(/[^a-z0-9]/g, ''));

  const firstName = cleanParts[0] || 'kullanici';
  const lastName = cleanParts[1] || '';

  const randNum = Math.floor(Math.random() * 89) + 10;
  const randNum3 = Math.floor(Math.random() * 899) + 100;

  const suggestions = [];
  if (lastName) {
    suggestions.push(`${firstName}.${lastName}`);
    suggestions.push(`${firstName}${lastName[0]}`);
    suggestions.push(`${firstName}${randNum}`);
  } else {
    suggestions.push(`${firstName}${randNum}`);
    suggestions.push(`${firstName}.${randNum3}`);
    suggestions.push(`pro.${firstName}`);
  }

  return suggestions.slice(0, 3);
}

export function addBannedWord(word) {
  if (!word) return false;
  const clean = word.trim().toLowerCase();
  if (!clean || BANNED_WORDS.includes(clean)) return false;
  BANNED_WORDS.push(clean);
  return true;
}

export function removeBannedWord(word) {
  if (!word) return false;
  const clean = word.trim().toLowerCase();
  const idx = BANNED_WORDS.indexOf(clean);
  if (idx !== -1) {
    BANNED_WORDS.splice(idx, 1);
    return true;
  }
  return false;
}
