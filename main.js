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
    nombre.focus();
    return;
}

if(apellido==''){
    alert("Escribe tu apellido");
    apellido.focus();
    return;
 }    

 if(fechaNacimiento==''){
    alert("Escribe tu fechaNacimiento");
    fecha.focus();
    return;
 } 
 
 if(nacionalidad==''){
    alert("Escribe tu nacionalidad");
    nacionalidad.focus();
    return;
 } 

 if(pasaporte==''){
    alert("Escribe tu pasaporte");
    pasaporte.focus();
    return;
 } 

 if(telefono==''){
    alert("Escribe tu telefono");
    telefono.focus();
    return;
 } 

 if(direccion==''){
    alert("Escribe tu direccion");
    direccion.focus();
    return;
 } 

 if(correo==''){
    alert("Escribe tu correo");
    correo.focus();
    return;
 } 

 if(tipoVisa==''){
    alert("Escribe tu tipoVisa");
    tipoVisa.focus();
    return;
 } 

 if(fechaCita==''){
    alert("Escribe tus fechasCita");
    fechaCita.focus();
    return;
 } 

 if(hora==''){
    alert("Escribe tu hora");
    hora.focus();
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

