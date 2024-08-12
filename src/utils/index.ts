export function getUrl(input: string, fallbackUrl: URL): URL {
  // sense its an m3u8 remove the last pathname
  try {
    return new URL(input)
  } catch (e) {
    const pathname = input.startsWith("/")
      ? input.substring(1)
      : input;
    const pathnames = fallbackUrl.pathname.split("/")
    pathnames[pathnames.length - 1] = pathname;

    fallbackUrl.pathname = pathnames.join("/")
    return fallbackUrl
  }
}