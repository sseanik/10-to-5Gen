export default function parseNames(names: string[]) {
  if (names.length === 0) return [' '];
  return (names[0].match(/,/g) || []).length > 1 ? names[0].split(',').map((name) => name.trim()) : names;
}
