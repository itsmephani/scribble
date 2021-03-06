(function() {
  'use strict';

   self.addEventListener('install', function(event) {
    // Perform some task
    //console.log('Service worker');
    //console.log(event);
   });

   self.addEventListener('activate', function(event) {
    // Perform some task
    //console.log('Service worker activated');
    //console.log(event);
   });



    var cacheName = 'v1.0';

    var filesToCache = [
        '/',
        './public/css/style.css',
        './public/css/toast.css',
        './public/js/app.js',
        './public/js/toast.js',
        './public/js/notes.js'
    ];

    // Install Service Worker
    self.addEventListener('install', function(event) {

        //console.log('Service Worker: Installing....');

        event.waitUntil(

            // Open the Cache
            caches.open(cacheName).then(function(cache) {
                //console.log('Service Worker: Caching App Shell at the moment......');

                // Add Files to the Cache
                return cache.addAll(filesToCache);
            })
        );
    });


    // Fired when the Service Worker starts up
    self.addEventListener('activate', function(event) {

        //console.log('Service Worker: Activating....');

        event.waitUntil(
            caches.keys().then(function(cacheNames) {
                return Promise.all(cacheNames.map(function(key) {
                    if( key !== cacheName) {
                        //console.log('Service Worker: Removing Old Cache', key);
                        return caches.delete(key);
                    }
                }));
            })
        );
        return self.clients.claim();
    });


    self.addEventListener('fetch', function(event) {

        //console.log('Service Worker: Fetch', event.request.url);

        //console.log("Url", event.request.url);

        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    });
  
})();
