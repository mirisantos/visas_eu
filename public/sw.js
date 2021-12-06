self.addEventListener("install", (event) => {
    event.waitUntil(
       caches.open("cache-reservacion").then((cache) => {
          cache.addAll(["/","index.html", "main.js"]);
    })
  );
});
self.addEventListener('message', function (event) {

    console.log("message:",event);
    /*if (event.data.hasOwnProperty('form_data')) {
        form_data = event.data.form_data;
    }*/
});

self.addEventListener("fetch", function(event) {
    let req = event.request;
    event.respondWith(
        fetch(req).catch(function() {
           // let req = event.request;
            console.log("request:", req);
            var data = req.json()
          console.log("json:", data);
                 // console.log("hubo un erro!!!!");  

        })
    );
});
/*
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cachesResponse => {
            return cachesResponse || fetch(event.request).catch(err=>{
              
            }); 
        })
    );
});
*/



self.addEventListener("sync", event => {
    if (event.tang =="citaPendiente"){
        event.waitUntil("syncMessages");
    }
});




