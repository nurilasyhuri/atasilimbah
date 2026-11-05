/**
 * SEO helper functions enforcing owner invariants:
 * - Title: 55-70 chars, separator " - ", includes brand
 * - Description: 120-155 chars, ends with "."
 */

export function formatTitle(title: string, defaultPadding = 'Teruji'): string {
  const brand = 'AtasiLimbah';
  const brandSuffix = ` - ${brand}`;
  let cleanTitle = title.replace(/[|—]/g, '-').trim();

  // If already ends with brand
  if (cleanTitle.endsWith(brandSuffix)) {
    if (cleanTitle.length >= 55 && cleanTitle.length <= 70) {
      return cleanTitle;
    }
    cleanTitle = cleanTitle.slice(0, -brandSuffix.length).trim();
  }

  // Target base length: 70 - 14 = 56 chars max
  const maxBase = 70 - brandSuffix.length;
  let base = cleanTitle;

  if (base.length > maxBase) {
    base = base.slice(0, maxBase);
    const lastSpace = base.lastIndexOf(' ');
    if (lastSpace > 30) {
      base = base.slice(0, lastSpace).trim();
    }
  }

  let candidate = `${base}${brandSuffix}`;

  // If candidate is still under 55 chars, pad before the brand suffix
  if (candidate.length < 55) {
    const needed = 55 - candidate.length;
    const padding = defaultPadding.slice(0, needed + 10);
    const paddedBase = `${base} ${padding}`.trim();
    if (paddedBase.length <= maxBase) {
      candidate = `${paddedBase}${brandSuffix}`;
    } else {
      // Direct clamp to fit between 55 and 70
      candidate = `${base} Standar Teknis${brandSuffix}`;
    }
  }

  // Ensure it never exceeds 70
  if (candidate.length > 70) {
    const trimmedBase = base.slice(0, 70 - brandSuffix.length);
    candidate = `${trimmedBase.trim()}${brandSuffix}`;
  }

  // Safety fallback if still under 55
  if (candidate.length < 55) {
    candidate = `${base} Spesifikasi Pengolahan${brandSuffix}`;
    if (candidate.length > 70) {
      candidate = `${base} Pengolahan${brandSuffix}`;
    }
  }

  return candidate;
}

export function formatDescription(desc: string, defaultSuffix = 'Konsultasi kapasitas, spesifikasi teknis, dan penawaran resmi pabrik.'): string {
  let clean = desc.trim();
  if (!clean.endsWith('.')) {
    clean += '.';
  }

  if (clean.length < 120) {
    const withoutDot = clean.slice(0, -1);
    clean = `${withoutDot}. ${defaultSuffix}`;
  }

  if (clean.length > 155) {
    clean = clean.slice(0, 154);
    const lastPeriod = clean.lastIndexOf('.');
    if (lastPeriod >= 120) {
      clean = clean.slice(0, lastPeriod + 1);
    } else {
      const lastSpace = clean.lastIndexOf(' ');
      if (lastSpace >= 120) {
        clean = clean.slice(0, lastSpace) + '.';
      } else {
        clean = clean.slice(0, 154) + '.';
      }
    }
  }

  return clean;
}
