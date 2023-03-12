addEventListener("fetch", (event) => {
  event.respondWith(respondfetch(event.request));
});

async function respondfetch(request) {
  try {
    const url = new URL(request.url);
    const refererUrl = url.searchParams.get("referer");
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("Invalid URL", { status: 400 });
    }

    const response = await fetch(targetUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        Referer: refererUrl || request.headers?.get("Referer") || "",
      },
    });

    /*return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Access-Control-Allow-Origin": request.headers.get("Referer") || "*",
        "Content-Type":
          response.headers?.get("Content-Type") ||  "application/json",
      },
    });*/

    let modifiedM3u8;
    if (targetUrl.endsWith(".m3u8")) {
      const responseText = await response.text();
      modifiedM3u8 = responseText
        .replace(
          /(#[^\n]*\n)?((?:#EXTINF:|)([\d\.]+),)([^\n]*)/g,
          (match, p1, p2, p3, p4) => {
            return `${p1 || ""}${p2}\n?url=${targetUrl
              .replace(/([^/]+\.m3u8)$/, "")
              .trim()}${p4}${refererUrl ? `&referer=${refererUrl}` : ""}`;
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
          response.headers?.get("Content-Type") || "application/json",
      },
    });
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }
}
