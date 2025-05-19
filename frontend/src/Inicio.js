import React, { useState, useRef } from "react";
import "./Inicio.css";
import Noticias from "./Noticias";
import Testimonios from "./Testimonios";

const clubes = [
  {
    nombre: "CD Castellón",
    escudo: "https://www.cdcastellon.com/wp-content/uploads/2018/10/Escudo_CDCastellon_Color.png",
  },
  {
    nombre: "Valencia CF",
    escudo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/94.png",
  },
  {
    nombre: "Villarreal CF",
    escudo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Villarreal_CF_logo-en.svg/1200px-Villarreal_CF_logo-en.svg.png",
  },
];

const Inicio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState("inicio");
  const testimoniosRef = useRef(null);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/proyectojugador.odt";
    link.download = "curriculum_deportivo.odt";
    link.click();
  };

  const prevClub = () => {
    setCurrentIndex((prev) => (prev === 0 ? clubes.length - 1 : prev - 1));
  };

  const nextClub = () => {
    setCurrentIndex((prev) => (prev === clubes.length - 1 ? 0 : prev + 1));
  };

  const handleLeerMasCaptacion = () => {
    setCurrentPage("noticias");
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", 
    });
  };

  const handleLeerMasTestimonio = () => {
    setCurrentPage("testimonios");
    setTimeout(() => {
      if (testimoniosRef.current) {
        testimoniosRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleVolverInicio = () => {
    setCurrentPage("inicio");
  };

  return (
    <div className="inicio-wrapper">
      {currentPage === "inicio" && (
        <>
          <h1 className="titulo-principal">INICIO</h1>
          <h2 className="informacion-title">¡Importante para todos los jugadores!</h2>
          <div className="informacion-container">
            <p>
              Todos los jugadores deberán rellenar el siguiente documento con sus datos reales.
              Esto es un requisito necesario para poder postularse a ofertas, realizar pruebas o ser considerado para cualquier oferta de un club.
            </p>
            <p>Puedes descargar el documento a través del siguiente botón y completarlo:</p>
            <button className="download-button" onClick={handleDownload}>
              Descargar documento de currículum deportivo
            </button>
            <p>
              Una vez que hayas completado el documento, podrás pasárselo a los equipos a los que te interese unirte y te contestarán en las próximas 72 horas.
              Recuerda que sin este documento, no podrás acceder a las ofertas de pruebas o selecciones.
            </p>
          </div>

          <h2 className="informacion-title">Jornada de Captación FFCV</h2>
          <div className="informacion-captacion">
            <p>
              Los ojeadores de clubes de toda España estarán presentes en la jornada de captación organizada por la FFCV,
              que tendrá lugar el próximo 27 de julio en el Polideportivo Municipal de Picassent. Es una oportunidad única para los jóvenes futbolistas.
            </p>
            <button onClick={handleLeerMasCaptacion}>Leer más sobre la jornada de captación</button>
          </div>

          <h2 className="informacion-title">Testimonio Destacado</h2>
          <div className="informacion-captacion">
            <p>
              Rodri, actual Balón de Oro 2024, ha elogiado la plataforma como una herramienta clave para el desarrollo de jóvenes talentos.
              Según él, hubiera sido de gran ayuda en sus inicios en el Roda y el Villarreal.
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

            <button onClick={handleLeerMasTestimonio}>Leer más sobre el testimonio de Rodri</button>
          </div>

          <h2 className="subtitulo-clubes">CLUBES COLABORADORES</h2>
          <div className="slider-container">
            <span className="carousel-arrow" onClick={prevClub}>
              &#8592;
            </span>
            <div className="club-card">
              <img
                src={clubes[currentIndex].escudo}
                alt={clubes[currentIndex].nombre}
                className="escudo-img"
              />
              <p className="club-nombre">{clubes[currentIndex].nombre}</p>
            </div>
            <span className="carousel-arrow" onClick={nextClub}>
              &#8594;
            </span>
          </div>
        </>
      )}

      {currentPage === "noticias" && (
        <div>
          <Noticias />
          <button onClick={handleVolverInicio}>Volver al Inicio</button>
        </div>
      )}

      {currentPage === "testimonios" && (
        <div ref={testimoniosRef}>
          <Testimonios>
            <button onClick={handleVolverInicio}>Volver al Inicio</button>
          </Testimonios>
        </div>
      )}
    </div>
  );
};

export default Inicio;
