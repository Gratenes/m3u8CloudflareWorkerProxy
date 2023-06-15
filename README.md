# m3u8 CloudflareWorker Proxy

### Install Method 1:
```bash
git clone https://github.com/Gratenes/m3u8CloudflareWorkerProxy.git m3u8proxy
cd m3u8proxy
npx wrangler login
npx wrangler publish
```

### Install Method 2:
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Gratenes/m3u8CloudflareWorkerProxy)


### Example:
```js
const url = 'https://example.url.example/?url=Link.m3u8&origin=url.example'

// If either your url or link has parameter's, encode via encodeURIComponent(link)
const encodedUrl = `https://m3u8.proxy.example/
?url=${encodeURIComponent("https://thisdomain.works/file.m3u8")}
&referer=${encodeURIComponent("https://thisdomain.works")}
&origin=${encodeURIComponent("https://thisdomain.works")}
`
```

> #### Cloudflare Workers Docs: https://developers.cloudflare.com/workers/get-started/guide/
