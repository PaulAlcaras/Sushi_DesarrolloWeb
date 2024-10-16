// Importa React y los hooks useEffect y useState
import React, { useEffect, useState } from 'react'; 
// Importa el archivo CSS específico para estilizar el carrito
import '../styles/Cart.css';
// Importa el logo desde img
import logo from '../img/logo.png';

// Componente Cart que recibe las props: goToPayment, goToIngreso, cart y setCart
const Cart = ({ goToPayment, goToIngreso, cart, setCart }) => {
  // Hook useState para mantener el estado del total del carrito, inicialmente 0.00
  const [total, setTotal] = useState(0.00);

  // useEffect para recalcular el total cada vez que cambie el contenido del carrito (cart)
  useEffect(() => {
    calculateTotal(cart); // Llama a la función que calcula el total
  }, [cart]); // El efecto se ejecutará siempre que el carrito cambie

  // Función para calcular el total del carrito sumando precio * cantidad de cada artículo
  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalAmount); // Actualiza el total en el estado
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (id, change) => {
    // Mapea el carrito, encuentra el producto por su id, y ajusta la cantidad
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + change }; // Cambia la cantidad
      }
      return item;
    }).filter(item => item.quantity > 0); // Filtra los productos que tienen cantidad > 0

    setCart(updatedCart); // Actualiza el carrito
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Guarda el carrito actualizado en localStorage
    calculateTotal(updatedCart); // Recalcula el total
  };

  // Función para eliminar un producto del carrito
  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id); // Filtra el producto con el id correspondiente
    setCart(updatedCart); // Actualiza el carrito
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Guarda el carrito actualizado en localStorage
    calculateTotal(updatedCart); // Recalcula el total
  };

  return (
    <div>
      {/* Header con logo */}
      <header>
        <img src={logo} alt='Logo'></img> {/* Imagen del logo */}
      </header>
      <div className="cart-container">
        {/* Título del carrito */}
        <h4>Tu Carrito</h4>
        {/* Contenedor para los productos del carrito */}
        <div>
          {/* Si el carrito está vacío, muestra un mensaje, de lo contrario, muestra los productos */}
          {cart.length === 0 ? (
            <p>No hay productos en el carrito</p> 
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                {/* Muestra el nombre y precio del producto */}
                <h3>{item.name}</h3>
                <h3>${item.price.toFixed(3)}</h3>
                {/* Controles para modificar la cantidad y eliminar el producto */}
                <div className="cart-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button> {/* Disminuir cantidad */}
                  <span>{item.quantity}</span> {/* Mostrar cantidad actual */}
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button> {/* Aumentar cantidad */}
                  <span className="remove-text" onClick={() => removeItem(item.id)}>Eliminar</span> {/* Eliminar producto */}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Muestra el total del carrito */}
        <h5>Total: ${total.toFixed(3)}</h5>

        {/* Botones para proceder al pago o regresar al menú */}
        <div className='boton-contenedor'>
          <button className="checkout-button" onClick={goToPayment}>Proceder al Pago</button> {/* Botón para ir al pago */}
          <button className="comeback-btn" onClick={goToIngreso}>Regresar al Menú</button> {/* Botón para regresar al menú */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
