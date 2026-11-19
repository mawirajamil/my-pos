const CACHE_NAME = "my-pos-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json"
];

const SCANNER_LIBRARY =
    "https://unpkg.com/html5-qrcode";

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            await cache.addAll(FILES_TO_CACHE);

            try {
                const request = new Request(
                    SCANNER_LIBRARY,
                    { mode: "no-cors" }
                );

                const response = await fetch(request);

                await cache.put(request, response);
            } catch (error) {
                console.log("Scanner library caching failed:", error);
            }
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request).catch(() => {
                return caches.match("./index.html");
            });
        })
    );
});
