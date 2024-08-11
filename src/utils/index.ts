export function getUrl(input: string, fallbackUrl: string): URL {
  try {
    return new URL(input)
  } catch (e) {
    return new URL(input, fallbackUrl);
  }
}