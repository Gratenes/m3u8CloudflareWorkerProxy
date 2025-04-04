import {M3u8ProxyV1} from "./logic/v1";
import {M3u8ProxyV2} from "./logic/v2";

addEventListener("fetch", (event) => {
  event.respondWith(respondfetch(event.request));
});

async function respondfetch(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/") return M3u8ProxyV1(request)
  if (pathname === "/v2") {
    /* if (request.method == "OPTIONS") return new Response(null, {
      status: 204, // No Content
      headers: {
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    }); */

    return M3u8ProxyV2(request)
  }
  return new Response("Not Found", {
    status: 404
  })
}
