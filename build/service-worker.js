"use strict";var precacheConfig=[["/index.html","4417e51abc99f6f9de4916c69e78f1f8"],["/static/css/main.c06320a9.css","eadea1d384e1442bde23505791a8e919"],["/static/js/main.d5ccb11e.js","8dacb31a99e570dcb0f5c7377dfc723d"],["/static/media/Roboto-Italic.237bbe8b.otf","237bbe8b54b3b0527fbd2840d210ea35"],["/static/media/Roboto-Italic.60abc028.woff","60abc028f4e8538b4962bf90cb4b93e9"],["/static/media/Roboto-Italic.de74c609.ttf","de74c60991cd63c8b922e0e665a39c7a"],["/static/media/Roboto-Light.357585d7.otf","357585d78adc9b3d6088e59456380df4"],["/static/media/Roboto-Light.7b5fb88f.ttf","7b5fb88f12bec8143f00e21bc3222124"],["/static/media/Roboto-Light.b4f3e590.woff","b4f3e590f75fcc81f2c5a9ac24b5f2b6"],["/static/media/Roboto-LightItalic.129c5057.ttf","129c5057f4480f9a353e15e1e1e09f9d"],["/static/media/Roboto-LightItalic.95f79cb7.otf","95f79cb7f3709d3a89c4d364221f8518"],["/static/media/Roboto-LightItalic.abcdcc04.woff","abcdcc04de0d7245f119f622f1673fab"],["/static/media/Roboto-Regular.81fb66b7.woff","81fb66b76fa4ef8766eb4d5ea1604ff1"],["/static/media/Roboto-Regular.ac3f799d.ttf","ac3f799d5bbaf5196fab15ab8de8431c"],["/static/media/Roboto-Regular.c323ed6e.otf","c323ed6e21943d12f61d4a75c532fd22"],["/static/media/minklist_icon.8b208c37.otf","8b208c37ee583deee740820e0d388f45"],["/static/media/minklist_icon.94e68629.ttf","94e68629d602d5b5172f9aafce8c5546"],["/static/media/minklist_icon.cb252887.woff","cb2528875053809a30a0a8c3f74760bc"],["/static/media/minklist_logo_no_crown.86a1506a.svg","86a1506a339f25869610b44ebeb40885"],["/static/media/roboto-light-scorefont.2c6f5422.woff","2c6f5422bcba1b508fec5d5fd4b60565"],["/static/media/roboto-light-scorefont.5dd2f3e5.ttf","5dd2f3e578f308e89ca0f0ed41d6a0e8"],["/static/media/roboto-light-scorefont.c7fe6dda.otf","c7fe6dda86f04cb51fbd518cf56faaf6"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,c),e=urlsToCacheKeys.has(a));var n="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});