import React, { useState, useEffect } from 'react'; // Importar React y hooks necesarios

function Pedidos() {
  const [pedidos, setPedidos] = useState([]); // Estado para almacenar la lista de pedidos

  // Obtener pedidos al cargar el componente
  useEffect(() => {
    // Realizar una solicitud GET para obtener los pedidos desde el servidor
    fetch('http://localhost:3001/pedidos')
      .then((response) => response.json()) // Convertir la respuesta en JSON
      .then((data) => setPedidos(data)) // Actualizar el estado con los datos recibidos
      .catch((error) => console.error('Error al obtener pedidos:', error)); // Manejar errores en la solicitud
  }, []); // El array vacío significa que se ejecuta solo una vez al montar el componente

  // Función para enviar un nuevo pedido
  const enviarPedido = () => {
    const nuevoPedido = { // Crear un nuevo objeto de pedido
      email: 'cliente@ejemplo.com', // Correo del cliente
      productos: [ // Lista de productos en el pedido
        { name: 'Sushi 1', quantity: 2 }, // Primer producto con su cantidad
        { name: 'Sushi 2', quantity: 1 } // Segundo producto con su cantidad
      ],
      total: 35.97 // Total del pedido
    };

    // Realizar una solicitud POST para enviar el nuevo pedido al servidor
    fetch('http://localhost:3001/pedidos', {
      method: 'POST', // Método de la solicitud
      headers: { 'Content-Type': 'application/json' }, // Indicar que se envía JSON
      body: JSON.stringify(nuevoPedido) // Convertir el nuevo pedido a una cadena JSON
    })
      .then((response) => response.json()) // Convertir la respuesta en JSON
      .then((data) => {
        console.log('Pedido guardado:', data); // Confirmar que el pedido fue guardado
        setPedidos([...pedidos, nuevoPedido]); // Actualizar la lista de pedidos añadiendo el nuevo
      })
      .catch((error) => console.error('Error al enviar pedido:', error)); // Manejar errores en la solicitud
  };

  return (
    <div>
      <h1>Pedidos</h1> {/* Título de la sección */}
      <ul>
        {pedidos.map((pedido, index) => ( // Mapear la lista de pedidos y renderizarlos
          <li key={index}>
            Cliente: {pedido.email}, Total: ${pedido.total} {/* Mostrar información del pedido */}
          </li>
        ))}
      </ul>
      <button onClick={enviarPedido}>Enviar Nuevo Pedido</button> {/* Botón para enviar un nuevo pedido */}
    </div>
  );
}

export default Pedidos; // Exportar el componente para su uso en otras partes de la aplicación
