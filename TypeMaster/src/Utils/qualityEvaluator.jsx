// ---------- Free text quality evaluation (browser-only, lightweight heuristics) ----------
/**
 * evaluateFreeTextQuality(typed)
 * Input: typed string
 * Output: {
 *   quality: 0..1,
 *   details: {
 *     totalWords, realWords, realWordRatio,
 *     uniqueWordsRatio, avgWordLen, sentenceCount, noiseRatio
 *   }
 * }
 */
export function evaluateFreeTextQuality(typed) {
  if (!typed || !typed.trim()) {
    return {
      quality: 0,
      details: {
        totalWords: 0,
        realWords: 0,
        realWordRatio: 0,
        uniqueWordsRatio: 0,
        avgWordLen: 0,
        sentenceCount: 0,
        noiseRatio: 1
      }
    };
  }

  const cleaned = typed.replace(/\r/g, '').trim();
  // split words by whitespace
  const words = cleaned.split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  // helper: check if token looks like an English word (simple heuristics)
  const looksLikeWord = (w) => {
    // remove punctuation edges
    const core = w.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
    if (!core) return false;
    // must contain at least one vowel and at least 2 letters
    if (core.length < 2) return false;
    if (!/[aeiouAEIOU]/.test(core)) return false;
    // avoid tokens that are mostly numeric or symbols
    if (/^[0-9]+$/.test(core)) return false;
    // avoid long runs of same char (aaaaaaa)
    if (/([a-zA-Z])\1{4,}/i.test(core)) return false;
    return true;
  };

  let realWords = 0;
  const seen = new Set();
  let totalWordChars = 0;
  let noiseChars = 0;
  for (const w of words) {
    totalWordChars += w.replace(/[^a-zA-Z]/g, '').length;
    if (looksLikeWord(w)) {
      realWords++;
    }
    const key = w.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (key) seen.add(key);
  }

  // punctuation-based sentence detection
  const sentenceCount = (cleaned.match(/[.!?]/g) || []).length || (totalWords >= 8 ? 1 : 0);

  // noise ratio: proportion of non-letter characters to total chars (higher => worse)
  const totalChars = cleaned.length;
  const letterChars = (cleaned.match(/[a-zA-Z]/g) || []).length;
  noiseChars = totalChars - letterChars;
  const noiseRatio = totalChars > 0 ? noiseChars / totalChars : 1;

  const realWordRatio = totalWords ? realWords / totalWords : 0;
  const uniqueWordsRatio = totalWords ? (seen.size / totalWords) : 0;
  const avgWordLen = totalWordChars && totalWords ? totalWordChars / totalWords : 0;

  // normalize metrics to 0..1
  // avgWordLen expected between 3 and 7; clamp to that range
  const normAvgWordLen = Math.max(0, Math.min(1, (avgWordLen - 2) / 5)); // 2->0, 7->1
  const normNoise = Math.max(0, Math.min(1, 1 - noiseRatio)); // 1 = no noise, 0 = all noise

  // weights (tweakable)
  const WEIGHTS = {
    realWordRatio: 0.45,
    uniqueWordsRatio: 0.2,
    avgWordLen: 0.15,
    sentencePresence: 0.1,
    noise: 0.1
  };

  const sentencePresenceScore = sentenceCount > 0 ? 1 : Math.min(1, totalWords / 20); // reward presence of sentences

  const quality =
    (realWordRatio * WEIGHTS.realWordRatio) +
    (uniqueWordsRatio * WEIGHTS.uniqueWordsRatio) +
    (normAvgWordLen * WEIGHTS.avgWordLen) +
    (sentencePresenceScore * WEIGHTS.sentencePresence) +
    (normNoise * WEIGHTS.noise);

  return {
    quality: Math.max(0, Math.min(1, quality)),
    details: {
      totalWords,
      realWords,
      realWordRatio: Math.round(realWordRatio * 100) / 100,
      uniqueWordsRatio: Math.round(uniqueWordsRatio * 100) / 100,
      avgWordLen: Math.round(avgWordLen * 100) / 100,
      sentenceCount,
      noiseRatio: Math.round(noiseRatio * 100) / 100
    }
  };
}
