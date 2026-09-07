const TITLES = /^(dr|mr|mrs|ms|miss|prof|sheikh|imam)\.?$/i;

export function initials(name: string): string {
  const parts = name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .filter((p) => p && !TITLES.test(p));
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
