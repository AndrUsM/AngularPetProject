export const intersect = (first: unknown[], second: unknown[]) => {
  const setB = new Set(second);
  return [...new Set(first)].filter(x => setB.has(x));
}
