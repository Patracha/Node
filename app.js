const express = require('express')
const app = express(); 
const fs = require('fs');

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.get('/', (req, res) =>{
    res.render('index.hbs')
})

/* Crear */

const fecha = new Date();
    const dia = ("0" + fecha.getDate()).slice(-2);
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    const anio = fecha.getFullYear();
    const fechaActual = `${dia}-${mes}-${anio}`;

app.get('/crear', (req, res) =>{
    const {archivo, contenido} = req.query; 
    const nombreFecha = (`${archivo} ${fechaActual}`)

    fs.writeFile(`${nombreFecha}.txt`, contenido, (err) =>{
        if (err){
            return res.send('Error al crear archivo ')
        }
        res.send('Archivo creado Exitosamente')
    })
})

app.get('/leer', (req, res) =>{

    const {archivo} = req.query; 

    fs.readFile(`${archivo}.txt`, (err, data) =>{
        if (err){
            console.log('No encontrado');
        }
        res.send(`Contenido del archivo ${archivo}.txt: ${data}`);
    })
    
})

app.get('/renombrar', (req, res) =>{
    const {nombre, nuevoNombre} = req.query; 
    fs.rename(`${nombre}.txt`, `${nuevoNombre}.txt`, (err) =>{
        if (err){
            
            return res.send('No se encuentra archivo con ese nombre');
        }
        res.send('Nombre cambiado exitosamente')
    })
})


/* Eliminar */
app.get('/eliminar', (req, res) =>{

    const {archivo} = req.query; 

    fs.unlink(`${archivo}.txt`, (err) =>{
        if (err){
            return res.send('Archivo no Existe')
        }
        res.send('Archivo eliminado exitosamente')
    })
  
})




app.listen(3000, () =>{
    console.log('Escuchando en 3000')
})