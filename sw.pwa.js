(function () {
    'use strict'

    var CACHE_SHELL = 'pwa-news-shell-v1';
    var CACHE_DATA = 'pwa-news-data-v1-api';
    var API = 'https://newsapi.org/v2/';
    var FILES_SHELL = [
        '/',
        './assets/css/main.css',
        './libraries/bootstrap/bootstrap.min.css',
        './libraries/font-awesome/css/font-awesome.min.css',
        './libraries/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0',
        './libraries/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0',
        './libraries/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0',
        './libraries/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0',
        './app/api/api.js',
        './app/router/router.js',
        './app/modules/news/news.js',
        './libraries/jquery/jquery-3.3.1.min.js',
        './libraries/tether/tether.min.js',
        './libraries/bootstrap/bootstrap.min.js',
        './libraries/moment/moment.min.js',
        './assets/img/noimage.png',
        './assets/fonts/OpenSans-Light.ttf'
    ]; 

    function getCategoryByUrl(url) {
        var splitedUrl = url.split('category=');
        var category = splitedUrl[1];
        
        return category;
    };

    self.addEventListener('install', function(event){
        event.waitUntil(
            self.caches.open(CACHE_SHELL).then(function(cache){
                return cache.addAll(FILES_SHELL);
            })
        )
    });

    self.addEventListener('fetch', function(event){
        if(event.request.url.indexOf(API) === -1) {
            // Cache First Strategy
            event.respondWith(
                caches.match(event.request).then(function(response){
                    if(response) {
                        return response;
                    }

                    return fetch(event.request);
                })
            )
        } else {
            // Network First Strategy
            event.respondWith(
                self.fetch(event.request).then(function(response){
                    var category = getCategoryByUrl(event.request.url);
                    var cacheDataName = category === '' ? CACHE_DATA : CACHE_DATA + '-' + category;
                    return caches.open(cacheDataName).then(function(cache){
                        cache.put(event.request.url, response.clone());
                        return response;
                    })
                }).catch(function(){
                    return caches.match(event.request);
                })
            )
        }
    });
}());