const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'TU_CADENA_DE_CONEXION_A_MONGODB'; // Usa la cadena de conexión de MongoDB Atlas o tu base de datos local
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToMongo() {
  try {
    await client.connect();
    db = client.db('miBaseDeDatos');  // Cambia 'miBaseDeDatos' al nombre de tu base de datos
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
  }
}

connectToMongo();

// Rutas del API
app.get('/pedidos', async (req, res) => {
  try {
    const pedidos = await db.collection('pedidos').find().toArray();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

app.post('/pedidos', async (req, res) => {
  try {
    const nuevoPedido = req.body;
    await db.collection('pedidos').insertOne(nuevoPedido);
    res.status(201).json({ mensaje: 'Pedido guardado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el pedido' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
