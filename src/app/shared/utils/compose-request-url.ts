export const composeRequestUrl = (url: string, options: string | null) => {
  if (!options) {
    return url;
  }

  return `${url}?${options}`;
}