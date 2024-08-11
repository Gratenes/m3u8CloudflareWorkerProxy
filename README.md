# m3u8 CloudflareWorker Proxy

## Install Method 1
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Gratenes/m3u8CloudflareWorkerProxy)

## Example V2

### JavaScript Example
```js
const m3u8url = "https://vz-cea98c59-23c.b-cdn.net/c309129c-27b6-4e43-8254-62a15c77c5ee/842x480/video.m3u8";
const proxyUrl = "https://proxy.example.com/v2";

const proxiedUrl = `${proxyUrl}/v2?url=${encodeURIComponent(m3u8url)}`;

// Alternative Method using URLSearchParams
const searchParams = new URLSearchParams();
searchParams.set("url", m3u8url);

const proxiedUrl2 = `${proxyUrl}/v2?${searchParams.toString()}`;

// Setting headers
searchParams.set("headers", JSON.stringify({
  Range: "bytes=0-500"
}));
```

### cURL Example
```bash
curl --request GET \
  --url 'https://proxy.example.com/v2?headers=%7B%0A%09%22Range%22%3A%20%22bytes%3D0-499%22%0A%7D&url=https%3A%2F%2Fvz-cea98c59-23c.b-cdn.net%2Fc309129c-27b6-4e43-8254-62a15c77c5ee%2F842x480%2Fvideo.m3u8'
```

## Install Method 2
```bash
git clone https://github.com/Gratenes/m3u8CloudflareWorkerProxy.git m3u8proxy
cd m3u8proxy
npx wrangler login
npx wrangler publish
```

## Devlopment Guide
```bash
git clone https://github.com/Gratenes/m3u8CloudflareWorkerProxy.git m3u8proxy
cd m3u8proxy
npm i
npm run dev
```

#### Cloudflare Workers Docs
For more details, refer to the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/get-started/guide/).

---

> #### Example (Deprecated V1)
> ```js
> const url = 'https://proxy.example.com/?url=Link.m3u8&origin=url.example';
> 
> // Encode parameters using encodeURIComponent
> const encodedUrl = `https://proxy.example.com/
> ?url=${encodeURIComponent("https://example.com/file.m3u8")}
> &referer=${encodeURIComponent("https://example.com")}
> &origin=${encodeURIComponent("https://example.com")}
> ```
