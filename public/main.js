/*if(!window.indexedDB){
    alert("No lo soporta IndesedDB")
}*/
let connection = indexedDB.open("Visas_2021", 1);
let database;

if ("serviceWorker"in navigator) {
    navigator.serviceWorker.register("./sw.js")
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);

  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems);
  });

document.addEventListener("DOMContentLoaded",()=>{
  
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
   const objStore= transaction.objectStore("cita");
let nombre = document.getElementById("nombre").value;
let apellido = document.getElementById("apellido").value;
let fechaNacimiento= document.getElementById("fechaNacimiento").value;
let nacionalidad = document.getElementById("nacionalidad").value;
let pasaporte = document.getElementById("pasaporte").value;
let telefono = document.getElementById("telefono").value;
let direccion = document.getElementById("direccion").value;
let correo = document.getElementById("correo").value;
let tipoVisa = document.getElementById("tipoVisa").value;
let fechaCita = document.getElementById("fechaCita").value;
let hora = document.getElementById("hora").value;


if(nombre==''){
    alert("Escribe tu nombre");
    return;
}

if(apellido==''){
    alert("Escribe tu apellido");
    return;
 }    

 if(fechaNacimiento==''){
    alert("Escribe tu fechaNacimiento");
    return;
 } 
 
 if(nacionalidad==''){
    alert("Escribe tu nacionalidad");
    return;
 } 

 if(pasaporte==''){
    alert("Escribe tu pasaporte");
    return;
 } 

 if(telefono==''){
    alert("Escribe tu telefono");
    return;
 } 

 if(direccion==''){
    alert("Escribe tu direccion");
    return;
 } 

 if(correo==''){
    alert("Escribe tu correo");
    return;
 } 

 if(tipoVisa==''){
    alert("Escribe tu tipoVisa");
    return;
 } 

 if(fechaCita==''){
    alert("Escribe tus fechasCita");
    return;
 } 

 if(hora==''){
    alert("Escribe tu hora");
    return;
 } 

    let cita={
        nombre: nombre,
        apellidos: apellido,
        fecha: fechaNacimiento,
        nacionalidad: nacionalidad,
        pasaporte: pasaporte,
        telefono: telefono,
        direccion: direccion,
        correo: correo,
        tipoVisa: tipoVisa,
        fechaCita: fechaCita,
        hora: hora
    };

    //console.log("CITA: ",cita);
    
    let citaObjeto = JSON.stringify(cita)
    /*fetch("/api/enviarCita", {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: citaObjeto})
    .then(res => res.json())    
    //.then (data => console.log (data))   
    .catch(err => { 

    });*/


    let result = objStore.add(cita);

    result.onsuccess = event => {
        console.log("Cita guardada")
        alert("Cita guardada");

    document.getElementById('form').reset();
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

 window.addEventListener("online", () =>{
     console.log("En linea")

     //leer y enviar las reservaciones a la api FETCH POST
 })    
 window.addEventListener("offline", () =>{
     console.log("Sin conexion") 

     //indexDB
     //guardar las reservaciones offline
})     