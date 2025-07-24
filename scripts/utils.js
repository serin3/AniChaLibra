export function cleanString(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

export function extractRelatives(relatives) {
  return Object.entries(relatives)
    .filter(([key, val]) => val && val !== "null")
    .map(([key, val]) => `${key}: ${val}`);
}
