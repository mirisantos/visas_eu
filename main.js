/*if(!window.indexedDB){
    alert("No lo soporta IndesedDB")
}*/
let connection = indexedDB.open("Visas_2021", 1);
let database;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems);
  });

document.addEventListener("DOMContentLoaded",()=>{
    console.log("DOM cargado")
let btnGuardar = document.querySelector("#btnGuardar")
let formulario = document.querySelector("#form");

//var frm=$("#form");

btnGuardar.addEventListener("click", () =>{
    guardar();

   // var datosCita=frm.serializeArray();

   // console.log("datos", datosCita);
   })
})

function guardar(params){
    const transaction = database.transaction(["cita"],"readwrite")
    const objStore= transaction.objectStore("cita")
    let cita={
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellido").value,
        fechaNacimiento: document.getElementById("fecha").value,

        nacionalidad: document.getElementById("nacionalidad").value,
        pasaporte: document.getElementById("pasaporte").value,
        telefono: document.getElementById("telefono").value,
        direccion: document.getElementById("direccion").value,
        correo: document.getElementById("correo").value,
        tipoVisa: document.getElementById("tipoVisa").value,
        fecha: document.getElementById("fechas").value,
        hora: document.getElementById("hora").value,
    
    };

    let result = objStore.add(cita);

    result.onsuccess = event => {
        console.log("Cita guardada")
        alert("Cita guardada");
    }
    result.onerror = event => {
        console.log("Error al guardar")    
}
}

connection.onsuccess= event =>{
    console.log("Conexión abierta") 
    database= connection.result;  
}
connection.onerror= event =>{
    console.log("Error al conectar")
}
connection.onblocked= event =>{
    console.log("Conexión bloqueada")
}
connection.onupgradeneeded= event =>{
    database= connection.result;

    database.createObjectStore("cita", { keyPath : 'id', autoIncrement : true });
       // var nick = usuarios.createIndex('by_nick', 'nick', { unique : true });
       // var password = usuarios.createIndex('by_password', 'password', { unique : false });

    console.log("BD Actualizada")
}