const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001; // Puerto del servidor backend

app.use(express.json()); // Para parsear cuerpos JSON

// Ruta para guardar un nuevo pedido
app.post('/guardar-pedido', (req, res) => {
    const nuevoPedido = req.body;

    // Ruta hacia el archivo pedidos.json
    const filePath = path.join(__dirname, 'pedidos.json');

    // Leer el archivo existente
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo de pedidos.' });
        }

        let pedidos = [];

        // Parsear el contenido existente si hay datos
        if (data) {
            pedidos = JSON.parse(data);
        }

        // Añadir el nuevo pedido al array de pedidos
        pedidos.push(nuevoPedido);

        // Escribir los pedidos actualizados en el archivo
        fs.writeFile(filePath, JSON.stringify(pedidos, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar el pedido.' });
            }

            res.status(200).json({ message: 'Pedido guardado con éxito.' });
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor backend ejecutándose en http://localhost:${port}`);
});
