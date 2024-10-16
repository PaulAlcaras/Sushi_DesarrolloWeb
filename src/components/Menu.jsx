import React, { useState, useEffect } from 'react'; // Importación de React y los hooks useState y useEffect
import '../styles/Menu.css'; // Importa el archivo CSS para los estilos del menú
import productosData from '../data/productos.json'; // Importa los datos de los productos desde un archivo JSON
// Importa el logo desde img
import logo from '../img/logo.png';


const Menu = ({ addToCart, goToCart }) => { // Definición del componente Menu, que recibe dos funciones por props: addToCart y goToCart
  const [productos, setProductos] = useState([]); // Hook useState para almacenar los productos en un estado. Inicialmente es un array vacío

  useEffect(() => { // Hook useEffect para cargar los productos cuando el componente se monta
    setProductos(productosData.productos); // Cargar los productos desde el archivo productos.json y actualizar el estado
  }, []); // [] asegura que esto solo ocurra una vez, cuando el componente se monta

  const handleAddToCart = (producto) => { // Función para añadir un producto al carrito
    addToCart(producto); // Llama a la función addToCart que fue pasada como prop para añadir el producto al carrito
  };

  // Renderizado del componente
  return (
    <div className="menu-container">
      {/* Título de la sección del menú */}
      <h4>Menú de Productos</h4>

      {/* Contenedor para los items del menú */}
      <div className="menu-items">
        {/* Mapea a través de los productos en el estado y crea un elemento visual para cada uno */}
        {productos.map(producto => (
          <div key={producto.id} className="menu-item">
            {/* Muestra el nombre del producto */}
            <h3>{producto.name}</h3>
            {/* Muestra el precio del producto con tres decimales */}
            <h4>${producto.price.toFixed(3)}</h4>
            {/* Botón para añadir el producto al carrito. Al hacer clic, se llama a handleAddToCart */}
            <button onClick={() => handleAddToCart(producto)}>Añadir al Carrito</button>
          </div>
        ))}
      </div>

      {/* Botón para ver el carrito, que llama a la función goToCart cuando se presiona */}
      <button onClick={goToCart}>Ver Carrito</button>
    </div>
  );
};

// Exporta el componente Menu para que pueda ser utilizado en otros archivos
export default Menu;
