import {getUrl} from "../utils";


export const M3u8ProxyV2 = async (request: Request<unknown>): Promise<Response> => {
  const url = new URL(request.url)

  const scrapeUrlString = url.searchParams.get("url")
  const scrapeHeadersString = url.searchParams.get("headers")

  let scrapeHeadersObject: ScrapeHeaders = null
  if (scrapeHeadersString) {
    try {
      scrapeHeadersObject = JSON.parse(scrapeHeadersString)
    } catch (e) {
      console.log(e)
      console.log("[M3u8 Proxy V2] Malformed scrape headers, could no parse using DEFAULT headers")
      scrapeHeadersObject = null
    }
  }

  if (!scrapeUrlString) {
    return new Response(JSON.stringify({
      success: false,
      message: "no scrape url provided"
    }), {
      status: 400,
    })
  }

  const scrapeUrl = new URL(scrapeUrlString)
  const headers: {
    [key: string]: string
  } = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    ...(typeof scrapeHeadersObject == "object" ? scrapeHeadersObject : {}),
  }

  console.log(headers)

  const response = await fetch(scrapeUrlString, {
    headers: headers,
  })


  // get the content type of the response
  const responseContentType = response.headers.get('Content-Type')
  let responseBody: BodyInit | null = response.body

  if (responseContentType && (responseContentType.includes("application/vnd.") || responseContentType.includes("video/MP2T"))) {
    const m3u8File = await response.text()
    const m3u8FileChunks = m3u8File.split("\n")
    const m3u8AdjustedChunks: string[] = []
    for (const line of m3u8FileChunks) {
      // lines that start with #'s are non data lines (they hold info like bitrate and other stuff)
      if (line.startsWith("#") || !line.trim()) {
        m3u8AdjustedChunks.push(line)
        continue;
      }

      const url = getUrl(line, scrapeUrl.protocol + "//" + scrapeUrl.hostname)
      const searchParams = new URLSearchParams()

      searchParams.set('url', url.toString())
      if (scrapeHeadersString) searchParams.set('headers', scrapeHeadersString)

      m3u8AdjustedChunks.push(`/v2?${searchParams.toString()}`)
    }

    responseBody = m3u8AdjustedChunks.join("\n")
  }

  const responseHeaders = new Headers(response.headers)
  responseHeaders.set("Access-Control-Allow-Origin", "*")

  return new Response(responseBody, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  })
}

type ScrapeHeaders = string | null | {
  [key: string]: string
}