import React from 'react'; // Importa la biblioteca de React para crear componentes
import './App.css'; // Importa los estilos CSS para el componente App
import Payment from './components/Payment'; // Importa el componente Payment
import Cart from './components/Cart'; // Importa el componente Cart
import Admin from './components/Admin'; // Importa el componente Admin
import Ingreso from './components/Ingreso'; // Importa el componente Ingreso
import Menu from './components/Menu'; // Importa el nuevo componente Menu

const App = () => { // Define el componente funcional App
    const [currentPage, setCurrentPage] = React.useState('ingreso'); // Estado para la página actual, inicializado en 'ingreso'
    const [cart, setCart] = React.useState([]); // Estado para el carrito, inicializado como un array vacío

    // Funciones para cambiar la página actual
    const goToPayment = () => setCurrentPage('payment'); // Redirige a la sección de pago
    const goToCart = () => setCurrentPage('cart'); // Redirige al carrito
    const goToAdmin = () => setCurrentPage('admin'); // Redirige al menú de Admin
    const goToMenu = () => setCurrentPage('menu'); // Redirige al menú
    const goToIngreso = () => setCurrentPage('ingreso'); // Redirige al menú de ingreso

    // Función para añadir un producto al carrito
    const addToCart = (producto) => {
        const existingItem = cart.find(item => item.id === producto.id); // Busca si el producto ya está en el carrito
        if (existingItem) {
            existingItem.quantity += 1; // Aumenta la cantidad si ya está en el carrito
        } else {
            const newItem = { ...producto, quantity: 1 }; // Crea un nuevo item con cantidad 1
            setCart([...cart, newItem]); // Añade el nuevo producto al carrito
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // Guarda el carrito actualizado en localStorage
        alert(`${producto.name} añadido al carrito`); // Muestra un mensaje de alerta al usuario
    };

    return ( // Renderiza el componente
        <div>
            {/* Renderiza el componente correspondiente según la página actual */}
            {currentPage === 'ingreso' && (
                <Ingreso goToMenu={goToMenu} goToAdmin={goToAdmin} />)}
            {currentPage === 'menu' && (
                <Menu addToCart={addToCart} goToCart={goToCart} />)}
            {currentPage === 'cart' && (
                <Cart goToPayment={goToPayment} goToIngreso={goToIngreso} cart={cart} setCart={setCart}/>)}
            {currentPage === 'payment' && (
                <Payment goToCart={goToCart} goToAdmin={goToAdmin} goToIngreso={goToIngreso}/>)}
            {currentPage === 'admin' && (
                <Admin goToIngreso={goToIngreso} />)} 
        </div>
    );
};

export default App; // Exporta el componente App para su uso en otras partes de la aplicación

