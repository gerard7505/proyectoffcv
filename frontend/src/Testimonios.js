import React, { useState } from 'react';
import './Testimonios.css';

const Testimonios = ({ children }) => {
  const [mostrarMasRodri, setMostrarMasRodri] = useState(false);
  const [mostrarMasAlvin, setMostrarMasAlvin] = useState(false);
  const [mostrarMasVillarreal, setMostrarMasVillarreal] = useState(false);

  const toggleMostrarMasRodri = () => {
    setMostrarMasRodri(!mostrarMasRodri);
  };

  const toggleMostrarMasAlvin = () => {
    setMostrarMasAlvin(!mostrarMasAlvin);
  };

  const toggleMostrarMasVillarreal = () => {
    setMostrarMasVillarreal(!mostrarMasVillarreal);
  };

  return (
    <div className="testimonios-wrapper">
      <h2 className="testimonios-title">TESTIMONIOS</h2>

      {/* Testimonio Rodri */}
      <div className="testimonio-card">
        <h3>Rodri - Balón de Oro 2024</h3>
        <p>
          “Esta plataforma me parece una auténtica joya para los jóvenes talentos. Me hubiera encantado tener algo así cuando jugaba en el Roda o en el Villarreal. Tener visibilidad, conectar con clubes y ver mi evolución de forma profesional desde tan joven... sin duda habría marcado la diferencia en mi carrera.”
        </p>

        <div className="imagenes-testimonio">
          <img
            src="https://imagenes.elpais.com/resizer/v2/7GPT27VAZ4HEZSWOHQBK6U6TJY.jpg?auth=6149b1e69b5e440a818916e455946d992a58715d2f1ba6e9daacb81a58b7e700&width=414&height=311&focal=1495%2C940"
            alt="Rodri Balón de Oro 2024"
            className="testimonio-imagen"
          />
          <img
            src="https://imagenes.cope.es/files/image_400_224/uploads/2024/11/12/6732a6c918d30.jpeg"
            alt="Rodri celebrando su Balón de Oro"
            className="testimonio-imagen"
          />
        </div>

        {mostrarMasRodri && (
          <>
            <p>
              “Hoy en día, este tipo de herramientas pueden acelerar el desarrollo de un jugador y abrirle puertas que antes parecían imposibles. Enhorabuena por la iniciativa, es justo lo que el fútbol base necesitaba.”
            </p>
            <p>
              “Recuerdo mis días en la cantera, donde la exposición y las oportunidades eran limitadas. Una plataforma como esta habría sido invaluable para mostrar mi progreso y conectar con entrenadores y ojeadores. Es inspirador ver cómo la tecnología está transformando el desarrollo del fútbol base.”
            </p>
          </>
        )}

        <button onClick={toggleMostrarMasRodri} className="leer-mas-btn">
          {mostrarMasRodri ? 'Leer menos' : 'Leer más'}
        </button>

        {}
        {children && <div className="volver-inicio-wrapper">{children}</div>}
      </div>

      {/* Testimonio Alvin Joe */}
      <div className="testimonio-card">
        <h3>Alvin Joe - Fichaje por el Juvenil Division de Honor del CD Castellón</h3>
        <p>
          “Gracias a esta plataforma he podido encontrar la visibilidad que necesitaba para seguir creciendo como futbolista. Tras varias semanas en contacto con clubes, finalmente he firmado por el Division de Honor del CD Castellón para la próxima temporada.”
        </p>

        <div className="imagenes-testimonio">
          <img
            src="https://esportbase.valenciaplaza.com/wp-content/uploads/2022/03/Alvin-Joe-fichaje.jpg"
            alt="Alvin Joe fichaje"
            className="testimonio-imagen"
          />
          <img
            src="https://castellonbase.com/wp-content/uploads/2023/08/juvenil-a-cd-22-23.jpg"
            alt="Juvenil A CD Castellón"
            className="testimonio-imagen"
          />
        </div>

        {mostrarMasAlvin && (
          <p>
            “Este tipo de iniciativas dan un impulso enorme a los que venimos trabajando en silencio. Estoy agradecido por haber tenido esta oportunidad y con muchas ganas de demostrarlo en el campo. Es increíble ver cómo una buena herramienta digital puede cambiar tu trayectoria en cuestión de semanas.”
          </p>
        )}

        <button onClick={toggleMostrarMasAlvin} className="leer-mas-btn">
          {mostrarMasAlvin ? 'Leer menos' : 'Leer más'}
        </button>
      </div>

      {/* Testimonio Villarreal */}
      <div className="testimonio-card">
        <h3>Villarreal CF - Firma de 10 nuevos jugadores</h3>
        <p>
          “Desde el Villarreal CF queremos agradecer públicamente a esta plataforma por su labor con el talento joven. Gracias a este sistema hemos podido incorporar a 10 jugadores para la próxima temporada. Una herramienta de scouting que realmente funciona.”
        </p>

        <div className="imagenes-testimonio">
          <img
            src="https://villarrealcf.es/wp-content/uploads/2022/09/f5201bff662c213d7545adccc78ce198.jpg"
            alt="Jugadores del Villarreal"
            className="testimonio-imagen"
          />
          <img
            src="https://estaticos-cdn.prensaiberica.es/clip/a1c07b08-97d5-41c0-b120-f520c20037d5_16-9-discover-aspect-ratio_default_0.jpg"
            alt="Firma de jugadores Villarreal"
            className="testimonio-imagen"
          />
        </div>

        {mostrarMasVillarreal && (
          <p>
            “Los informes detallados y el seguimiento del desarrollo de cada jugador nos han permitido tomar decisiones acertadas y reducir tiempos en los procesos de selección. Estamos convencidos de que estos nuevos talentos contribuirán al crecimiento del club. Seguiremos atentos a lo que esta plataforma nos puede ofrecer.”
          </p>
        )}

        <button onClick={toggleMostrarMasVillarreal} className="leer-mas-btn">
          {mostrarMasVillarreal ? 'Leer menos' : 'Leer más'}
        </button>
      </div>
    </div>
  );
};

export default Testimonios;
