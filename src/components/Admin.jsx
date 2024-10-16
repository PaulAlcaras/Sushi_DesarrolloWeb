import React, { useState, useEffect } from 'react'; // Importar React y hooks necesarios
import '../styles/Admin.css'; // Importar estilos para el componente Admin

const Admin = ({ goToIngreso }) => {
    // Estado para almacenar pedidos, productos, clientes, nuevos productos y nuevos clientes
    const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('pedidos')) || []);
    const [productos, setProductos] = useState(JSON.parse(localStorage.getItem('productos')) || []);
    const [clientes, setClientes] = useState(JSON.parse(localStorage.getItem('clientes')) || []);
    const [newProduct, setNewProduct] = useState({ id: '', name: '', price: '', quantity: 1 });
    const [newClient, setNewClient] = useState({ email: '', name: '' });
    const [activeSection, setActiveSection] = useState(''); // Estado para gestionar la sección activa

    // useEffect para guardar productos y clientes en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }, [productos, clientes]);

    // Función para agregar un nuevo producto
    const handleAddProduct = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setProductos([...productos, newProduct]); // Agregar nuevo producto al estado
        setNewProduct({ id: '', name: '', price: '', quantity: 1 }); // Reiniciar formulario
    };

    // Función para agregar un nuevo cliente
    const handleAddClient = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setClientes([...clientes, newClient]); // Agregar nuevo cliente al estado
        setNewClient({ email: '', name: '' }); // Reiniciar formulario
    };

    // Función para marcar un pedido como listo y actualizar el estado
    const handleOrderReady = (index) => {
        const updatedOrders = orders.filter((_, orderIndex) => orderIndex !== index); // Filtrar el pedido listo
        setOrders(updatedOrders); // Actualizar el estado de pedidos
        localStorage.setItem('pedidos', JSON.stringify(updatedOrders)); // Actualizar localStorage
    };

    // Función para renderizar el contenido según la sección activa
    const renderContent = () => {
        switch (activeSection) {
            case 'productos':
                return (
                    <div className='productos-container'>
                        <h7>Agregar Nuevo Producto</h7>
                        <form className='form-style' onSubmit={handleAddProduct}>
                            <label>ID del producto:</label>
                            <input
                                className='space'
                                type="number"
                                placeholder="ID"
                                value={newProduct.id}
                                onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })} // Actualizar ID del producto
                                required
                            />
                            <label>Nombre del producto:</label>
                            <input
                                className='space'
                                type="text"
                                placeholder="Nombre"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} // Actualizar nombre del producto
                                required
                            />
                            <label>Precio del producto:</label>
                            <input
                                className='space'
                                type="number"
                                placeholder="Precio"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} // Actualizar precio del producto
                                required
                            />
                            <button className='boton-agregar' type="submit">Agregar Producto</button>
                        </form>

                        <h7>Lista de Productos</h7>
                        {productos.length === 0 ? ( // Verificar si hay productos disponibles
                            <p>No hay productos disponibles.</p>
                        ) : (
                            <ul>
                                {productos.map((product, index) => ( // Mapear productos para mostrarlos
                                    <li key={index}>
                                        <p>ID: {product.id}</p>
                                        <p>Nombre: {product.name}</p>
                                        <p>Precio: ${product.price}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            case 'clientes':
                return (
                    <div>
                        <h7>Agregar Nuevo Cliente</h7>
                        <form className='form-style' onSubmit={handleAddClient}>
                            <label>Email del cliente:</label>
                            <input
                                className='space'
                                type="email"
                                placeholder="Email"
                                value={newClient.email}
                                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} // Actualizar email del cliente
                                required
                            />
                            <label>Nombre del cliente:</label>
                            <input
                                className='space'
                                type="text"
                                placeholder="Nombre completo"
                                value={newClient.name}
                                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} // Actualizar nombre del cliente
                                required
                            />
                            <label>Dirección del cliente:</label>
                            <input
                                className='space'
                                type="text"
                                placeholder="Dirección"
                                value={newClient.name}
                                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} // Actualizar dirección del cliente
                                required
                            />
                            <button className='boton-agregar' type="submit">Agregar Cliente</button>
                        </form>

                        <h7>Lista de Clientes</h7>
                        {clientes.length === 0 ? ( // Verificar si hay clientes almacenados
                            <h8>No hay clientes almacenados.</h8>
                        ) : (
                            <ul>
                                {clientes.map((client, index) => ( // Mapear clientes para mostrarlos
                                    <li className='datos-lista' key={index}>
                                        <h8>Email: {client.email}</h8>
                                        <h8>Nombre: {client.name}</h8>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            case 'pedidos':
                return (
                    <div className='pedidos-container'>
                        <h7>Pedidos Recientes</h7>
                        {orders.length === 0 ? ( // Verificar si hay pedidos almacenados
                            <p>No hay pedidos almacenados.</p>
                        ) : (
                            <ul>
                                {orders.map((order, index) => ( // Mapear pedidos para mostrarlos
                                    <li className='sobre-pedidos' key={index}>
                                        <p>Email del cliente: {order.email}<br /></p>
                                        <p>Total: ${order.total}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            case 'comanda':
                return (
                    <div>
                        <h7>Comanda</h7>
                        {orders.length === 0 ? ( // Verificar si hay pedidos almacenados
                            <p>No hay pedidos almacenados.</p>
                        ) : (
                            <ul>
                                {orders.map((pedido, index) => ( // Mapear pedidos para mostrarlos
                                    <li className='pedido-item' key={index}>
                                        Cliente: {pedido.email}<br></br>Productos:<br></br> {pedido.productos ? pedido.productos.map(product => `${product.name} (x${product.quantity})`).join(', ') : 'No hay productos'}
                                        <button className='boton-listo' onClick={() => handleOrderReady(index)}>Listo</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
                
            default:
                return <h8>Selecciona una opción a la izquierda.</h8>; // Mensaje por defecto
        }
    };

    return (
        <div className="admin-layout main-container">
            <nav>
                {/* Botones de navegación para cambiar de sección */}
                <button className="botones-admin" onClick={() => setActiveSection('pedidos')}>Ver Pedidos</button>
                <button className="botones-admin" onClick={() => setActiveSection('productos')}>Agregar Productos</button>
                <button className="botones-admin" onClick={() => setActiveSection('clientes')}>Agregar Clientes</button>
                <button className='botones-admin' onClick={() => setActiveSection('comanda')}>Comanda</button>
                <button className='botones-admin' onClick={goToIngreso}>Regresar al Menú</button>
            </nav>

            <div className="content">
                <div className='contenido'>
                    {renderContent()} {/* Llamar a la función que renderiza el contenido */}
                </div>
            </div>
        </div>
    );
};

export default Admin; // Exportar el componente
