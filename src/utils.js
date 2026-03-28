export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarVariant(id) {
  const variants = ['v1', 'v2', 'v3', 'v4', 'v5'];
  return variants[id % variants.length];
}

export function getAvailabilityClass(avail) {
  const lower = (avail || '').toLowerCase().replace(/[-_\s]/g, '');
  if (lower.includes('fulltime') || lower.includes('full')) return 'full-time';
  if (lower.includes('parttime') || lower.includes('part')) return 'part-time';
  if (lower.includes('freelance')) return 'freelance';
  return 'contract';
}

export function parseSkills(skills) {
  if (!skills) return [];
  return skills.split(',').map((s) => s.trim()).filter(Boolean);
}
