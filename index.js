const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');

// Ruta para mostrar el formulario
app.get('/', (req, res) => {
    res.render('index', { gifUrl: null }); // Pasar null como gifUrl inicialmente
});

// Ruta para manejar la solicitud del formulario
app.get('/search', async (req, res) => {
    try {
        // Obtener el número de la búsqueda del query string
        const { number } = req.query;
        // Realizar una solicitud a la API
        const response = await axios.get(`http://localhost:5214/api/links/${number}`);
        // Extraer el enlace del GIF de la respuesta
        const gifUrl = response.data.href;

        // Renderizar la vista con el GIF
        res.render('index', { gifUrl });
    } catch (error) {
        // Manejar errores
        console.error(error);
        res.render('error');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
