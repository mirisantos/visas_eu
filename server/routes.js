const { response } = require("express")
const express = require("express")

const router = express.Router();

//console.log("router:",router);

router.get("/obtenerCitas",(req,res) => {
    res.json("Hola desde la ruta / obtenerCitas")
   // res.json(citas)
})

router.post("/enviarCita",(req,res) => {
const cita = {

};
//citas.push(cita)
//console.log (citas)
//res.json(citas)
console.log (req.body);

res.json(req.body);
});


module.exports = router;
