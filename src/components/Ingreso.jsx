import React from 'react'; // Importa la biblioteca React
import '../styles/Ingreso.css'; // Importa los estilos específicos para el componente Ingreso
import logo from '../img/logo.png'; // Importa la imagen del logo desde la carpeta img

// Define el componente funcional Ingreso, que recibe dos props: goToMenu y goToAdmin
const Ingreso = ({ goToMenu, goToAdmin }) => {
    return (
        <div>
            {/* Header que contiene el logo */}
            <header>
                <img src={logo} alt='Logo'></img> {/* Muestra la imagen del logo con un alt para accesibilidad */}
            </header>
        
            {/* Contenedor principal para el contenido de la página de ingreso */}
            <div className="ingreso-container">
                <h1>Bienvenido</h1> {/* Título de bienvenida */}
                <h2>Seleccione una opción:</h2> {/* Subtítulo que invita al usuario a elegir una opción */}
                
                {/* Contenedor para los botones de opciones */}
                <div className="ingreso-buttons">
                    {/* Botón para acceder al menú de productos, llama a la función goToMenu al hacer clic */}
                    <button className="ingreso-button1" onClick={goToMenu}>
                        Entrar al Menú
                    </button>
                    {/* Botón para acceder a la sección de administración, llama a la función goToAdmin al hacer clic */}
                    <button className="ingreso-button2" onClick={goToAdmin}>
                        Entrar a Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ingreso; // Exporta el componente para su uso en otras partes de la aplicación
