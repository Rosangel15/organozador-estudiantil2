// sw.js
self.addEventListener('install', event => {
    console.log('Service Worker instalado');
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
    console.log('Service Worker activado');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png',
        vibrate: [200, 100, 200],
        data: {
            url: window.location.href
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});