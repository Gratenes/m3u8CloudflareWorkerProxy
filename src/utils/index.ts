export function getUrl(input: string, fallbackUrl: URL): URL {
  // sense its an m3u8 remove the last pathname
  try {
    return new URL(input)
  } catch (e) {
    if (input.startsWith("//")) {
      return new URL(input.replace("//", "https://"))
    }

    const pathname = input.startsWith("/")
      ? input.substring(1)
      : input;
    const pathnames = fallbackUrl.pathname.split("/")
    pathnames.pop()
    pathnames.push(pathname)

    const fallbackUrlClone = new URL(fallbackUrl)
    fallbackUrlClone.pathname = pathnames.join("/")
    return fallbackUrlClone
  }
}