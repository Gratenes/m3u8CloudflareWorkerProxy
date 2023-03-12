# m3u8 CloudflareWorker Proxy

### Install:
```bash
git clone https://github.com/Gratenes/m3u8CloudflareWorkerProxy.git m3u8proxy
cd m3u8proxy
npx wrangler login
npx wrangler publish
```


### Example:
```js
const url = 'example.url.example/?url=Link.m3u8&referer=url.example'

// If either your url or link has parameter's, encode via encodeURIComponent(link)
const encodedUrl = `example.url.example/?url=${encodeURIComponent(Link.m3u8)}&referer=${encodeURIComponent(url.example)}`
```

> #### Cloudflare Workers Docs: https://developers.cloudflare.com/workers/get-started/guide/
