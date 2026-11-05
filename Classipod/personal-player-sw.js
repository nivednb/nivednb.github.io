'use strict';
const CACHE = "classipod-shell-811c5e3dc59816db";
const FILES = ["./", "./assets/AssetManifest.bin", "./assets/AssetManifest.bin.json", "./assets/FontManifest.json", "./assets/NOTICES", "./assets/assets/fonts/Helvetica-Bold.ttf", "./assets/assets/fonts/Helvetica.ttf", "./assets/assets/fonts/PixelifySans-OFL.txt", "./assets/assets/fonts/PixelifySans.ttf", "./assets/assets/images/app_icon.webp", "./assets/assets/images/default_album_cover.webp", "./assets/assets/images/noise.webp", "./assets/assets/sounds/ipod_click.wav", "./assets/fonts/MaterialIcons-Regular.otf", "./assets/fonts/fallback/Roboto-Regular.ttf", "./assets/packages/cupertino_icons/assets/CupertinoIcons.ttf", "./assets/packages/material_ui/shaders/ink_sparkle.frag", "./assets/packages/media_kit/assets/web/hls1.4.10.js", "./assets/shaders/ink_sparkle.frag", "./assets/shaders/stretch_effect.frag", "./browser_library.js", "./canvaskit/canvaskit.js", "./canvaskit/canvaskit.js.symbols", "./canvaskit/canvaskit.wasm", "./canvaskit/chromium/canvaskit.js", "./canvaskit/chromium/canvaskit.js.symbols", "./canvaskit/chromium/canvaskit.wasm", "./canvaskit/skwasm.js", "./canvaskit/skwasm.js.symbols", "./canvaskit/skwasm.wasm", "./canvaskit/skwasm_heavy.js", "./canvaskit/skwasm_heavy.js.symbols", "./canvaskit/skwasm_heavy.wasm", "./canvaskit/webparagraph/canvaskit.js", "./canvaskit/webparagraph/canvaskit.js.symbols", "./canvaskit/webparagraph/canvaskit.wasm", "./canvaskit/wimp.js", "./canvaskit/wimp.js.symbols", "./canvaskit/wimp.wasm", "./favicon.ico", "./flutter.js", "./flutter_bootstrap.7dda91dc7cb36b11.js", "./icons/Icon-maskable-192.png", "./icons/Icon-maskable-512.png", "./icons/icon-192.png", "./icons/icon-512.png", "./index.html", "./jsmediatags-LICENSE.txt", "./jsmediatags.min.js", "./main.156fa62b5dfc364f.dart.js", "./manifest.json", "./version.json", "./wheel_audio.js"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES.map(path => new Request(path, {cache: 'reload'})))));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('classipod-shell-') && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Audio blobs live in IndexedDB; no personal files pass through this cache.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(event.request, {ignoreSearch: true});
    if (cached) return cached;
    if (event.request.mode === 'navigate') {
      try { return await fetch(event.request); }
      catch (_) { return cache.match('./index.html'); }
    }
    return fetch(event.request);
  })());
});
