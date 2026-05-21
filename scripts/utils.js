export function cleanString(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

export function extractRelatives(relationships) {
  return Object.entries(relationships)
    .filter(([key, val]) => val && val !== "null")
    .map(([key, val]) => `${key}: ${val}`);
}
