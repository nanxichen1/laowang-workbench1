/* Service Worker - 图书带货工作台 PWA
 * 关键策略：纯网络穿透，永不缓存。
 * 本应用是「云端固定网址 + 手机 WebView 壳」的实时架构，
 * 必须保证手机端永远拿到最新页面，因此 SW 不做任何缓存，
 * 所有请求直接走网络，彻底杜绝「网页更新了手机还显示旧版」的问题。
 */
const CACHE = 'wb-v5';

self.addEventListener('install', e => {
  // 立即激活，不等旧页面关闭
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    // 清掉历史所有缓存（wb-v3/v4 等），避免任何旧缓存残留
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // 不拦截、不缓存：直接走浏览器默认网络请求，保证永远最新
  // （不调用 e.respondWith，请求按默认方式发往网络）
});
