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



self.addEventListener("sync", function (event) {
    if (event.tag =="sync-reservacion"){//Sync-Reservacion
        event.waitUntil(doSomeStuff()); 
    }
});


function doSomeStuff(){
//1- Obtener los datos del index Db
//2- Enviar los datos al api
//3- Eliminar los datos que se han enviado
    let connection = indexedDB.open("Visas_2021", 1);
    let database;
   
       

    connection.onsuccess= event =>{
       // console.log("Conexión abierta") 
        database =  connection.result;  
        let transaction = database.transaction(["cita"],"readwrite");
        let objStore = transaction.objectStore("cita");
        var request = objStore.getAll();
        
        request.onerror = function(event) {
            console.log("error:", event);
        };
        request.onsuccess = function(event) {
            let items = request.result;

            var url="/api/enviarCita";
            items.forEach(element => {

                var key = element.id;
                let citaObjeto = JSON.stringify(element);

                
                //Enviar los datos al server
                fetch(url, {
                    method: "post",
                    headers: {
                    "content-Type": "application/json"
                },
                body: citaObjeto
                }).then(res => res.json())    
                .then (data => {
                    
                }).catch(err => { });
                //Borrar el item
                console.log("aqui debería entrar",key);
                var requestb = objStore.delete(key);
               requestb.onerror = function(event) {
               console.log("error:", event);
               };
                
            });


            
      
            };
    };
    connection.onerror= event =>{
        console.log("Error al conectar")
    }
    connection.onblocked= event =>{
        console.log("Conexión bloqueada");
    }
    connection.onupgradeneeded= event =>{
        database= connection.result;
    
       // database.createObjectStore("cita", { keyPath : 'id', autoIncrement : true });
           // var nick = usuarios.createIndex('by_nick', 'nick', { unique : true });
           // var password = usuarios.createIndex('by_password', 'password', { unique : false });
    
       // console.log("BD Actualizada")
    }
   



}

