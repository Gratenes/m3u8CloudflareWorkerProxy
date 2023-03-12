addEventListener("fetch", (event) => {
  event.respondWith(respondfetch(event.request));
});

async function respondfetch(request) {
  try {
    const url = new URL(request.url);
    const refererUrl = decodeURIComponent(url.searchParams.get("referer") || "");
    const targetUrl = decodeURIComponent(url.searchParams.get("url") || "");

    if (!targetUrl) {
      return new Response("Invalid URL", { status: 400 });
    }

    const response = await fetch(targetUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        Referer: refererUrl || "",
      },
    });

    let modifiedM3u8;
    if (targetUrl.includes(".m3u8")) {
      modifiedM3u8 = await response.text();

      if (refererUrl) {
        const regex = /(#EXTINF:.+?,)\n(ep\.\d+?\.\w+.+)/gm;
        modifiedM3u8 = modifiedM3u8.replace(regex, (match, p1, p2) => {
          return `${p1}\n${p2}${refererUrl ? `&referer=${encodeURIComponent(refererUrl)}` : ""}`;
        });
      }
      

      modifiedM3u8 = modifiedM3u8
        .replace(
          /(#[^\n]*\n)?((?:#EXTINF:|)([\d\.]+),)([^\n]*)/g,
          (match, p1, p2, p3, p4) => {
            return `${p1 || ""}${p2}${p4}\n?url=${encodeURIComponent(targetUrl
              .replace(/([^/]+\.m3u8)$/, "")
              .trim())}`;
          }
        )
        .replace(/\n(ep\.\d+\.\d+\.\w+)/g, "$1"); 
    }

    return new Response(modifiedM3u8 || response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type":
          response.headers?.get("Content-Type") ||
          "application/vnd.apple.mpegurl",
      },
    });
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
}
