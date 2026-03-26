// Minimal service worker to enable crossOriginIsolated for SharedArrayBuffer
// Only intercepts document requests to add COEP/COOP headers

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim()),
);

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only intercept navigation requests (HTML pages)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then((response) => {
        const headers = new Headers(response.headers);
        headers.set("Cross-Origin-Opener-Policy", "same-origin");
        headers.set("Cross-Origin-Embedder-Policy", "credentialless");
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }),
    );
  }
});
