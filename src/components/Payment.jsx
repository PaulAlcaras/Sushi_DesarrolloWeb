import React from 'react'; // Importa la biblioteca de React para crear componentes
import '../styles/Payment.css'; // Importa los estilos CSS para el componente de pago
import clientesData from '../data/clientes.json'; // Importa los datos de clientes desde un archivo JSON
// Importa el logo desde img
import logo from '../img/logo.png'; // Importa la imagen del logo

const Payment = ({ goToCart, goToIngreso }) => { // Define el componente Payment y recibe las funciones goToCart y goToIngreso como props
    const cliente = clientesData.cliente[0]; // Obtiene el primer cliente de los datos importados

    // Función para calcular el total del carrito
    const calculateTotal = (cartItems) => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // Suma los precios de los items multiplicados por su cantidad
    };

    // Recupera el carrito del localStorage, o un array vacío si no hay nada
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = calculateTotal(cart); // Calcula el total del carrito

    // Maneja el proceso de pago
    const handlePayment = () => {
        // Crear un nuevo pedido
        const newOrder = {
            email: cliente.email,  // Asegúrate de tener el email del cliente
            total: total.toFixed(3), // Guardamos el total de la compra con tres decimales
            productos: cart.map(product => ({ // Mapea los productos en el carrito
                name: product.name, // Nombre del producto
                quantity: product.quantity, // Cantidad del producto
            })),
        };

        // Recupera los pedidos anteriores del localStorage
        const storedOrders = JSON.parse(localStorage.getItem('pedidos')) || [];
        storedOrders.push(newOrder); // Agrega el nuevo pedido al array de pedidos
        localStorage.setItem('pedidos', JSON.stringify(storedOrders)); // Almacena de nuevo en localStorage

        // Vaciar el carrito después de realizar el pedido
        localStorage.setItem('cart', JSON.stringify([])); // Establece el carrito como un array vacío

        // Genera el contenido del archivo .txt
        const orderDetails = `\
            Boleta de Compra
            =================
            Nombre: ${cliente.nombre}
            Email: ${cliente.email}
            Dirección: ${cliente.direccion}
            Productos:
            ${cart.map(item => `${item.name} - $${item.price.toFixed(3)} x ${item.quantity}`).join('\n')} // Detalles de los productos en el carrito
            ==================================
            Total: $${total.toFixed(3)} // Total de la compra
        `;

        // Crea un blob y una URL para descargar el archivo .txt
        const blob = new Blob([orderDetails], { type: 'text/plain' }); // Crea un nuevo blob con el contenido de la boleta
        const url = URL.createObjectURL(blob); // Crea una URL a partir del blob
        const link = document.createElement('a'); // Crea un elemento de enlace
        link.href = url; // Establece el atributo href del enlace a la URL del blob
        link.download = 'boleta.txt'; // Establece el nombre del archivo a descargar
        document.body.appendChild(link); // Añade el enlace al cuerpo del documento
        link.click(); // Simula un clic en el enlace para iniciar la descarga
        document.body.removeChild(link); // Elimina el enlace del documento
        URL.revokeObjectURL(url); // Revoca la URL creada para liberar memoria

        alert('Pago procesado y boleta descargada.'); // Muestra un mensaje de alerta al usuario
    };

    return ( // Renderiza el componente
        <div>
            <header>
                <img src={logo} alt='Logo'></img> {/* Imagen del logo */}
            </header>
        
            <div className="payment-container"> {/* Contenedor principal para los detalles de pago */}
                <h4>Resumen de Pago</h4>
                <p className="payment-summary">Total a Pagar: ${total.toFixed(3)}</p> {/* Muestra el total a pagar */}
                <h5>Detalles del Cliente</h5>
                <p>Nombre: {cliente.nombre}</p> {/* Muestra el nombre del cliente */}
                <p>Email: {cliente.email}</p> {/* Muestra el email del cliente */}
                <p>Dirección: {cliente.direccion}</p> {/* Muestra la dirección del cliente */}
                <button className="boton-pagar" onClick={handlePayment}>Pagar</button> {/* Botón para procesar el pago */}
                <button className="boton-cancelar" onClick={goToCart}>Cancelar</button> {/* Botón para cancelar el pago */}
                <button className="boton-regresar" onClick={goToIngreso}>Regresar al Menú</button> {/* Botón para regresar al menú */}
            </div>
        </div>  
    );
};

export default Payment; // Exporta el componente Payment para su uso en otras partes de la aplicación
