import React from 'react';
import './QuienesSomos.css';

const QuienesSomos = () => {
  return (
    <div className="quienes-somos-wrapper">
      <h2 className="quienes-somos-title">¿Quiénes somos?</h2>

      <div className="quienes-somos">
        <div className="qs-bloque">
         
          <p>
            Somos la Federación de Fútbol de la Comunidad Valenciana (FFCV), una entidad que tiene como objetivo el desarrollo y promoción del fútbol en nuestra región. Trabajamos para ofrecer oportunidades a jugadores, entrenadores y clubes, creando un espacio donde el talento pueda ser descubierto y desarrollado.
          </p>
        </div>
        <img
            src="https://ffcv.es/wp/wp-content/uploads/2024/06/IMG_0336-1170x780.jpg"
            alt="Reunión FFCV"
            className="qs-img"
          />
        <h3>Descripción:</h3>
        <div className="qs-bloque">
          <p>
            El objetivo de este proyecto es crear una nueva plataforma web que pueda satisfacer la necesidad de conectar a jugadores de fútbol y clubes deportivos en la Comunidad Valenciana. A través de esta página, los jugadores de fútbol completarán un curriculum deportivo en el que describen sus habilidades, experiencia y disposición para jugar, con el que los equipos podrán decidir si sumarlos a sus filas.
          </p>
          <img
            src="https://ffcv.es/wp/wp-content/uploads/2025/03/IMG_9566-1-1170x780.jpg"
            alt="Captación de talentos FFCV"
            className="qs-img"
          />
        </div>

        <p>
          Además, el sistema tiene una sección donde los equipos pueden publicar ofertas para atraer nuevos talentos y aumentar sus plantillas. Este proyecto tiene como objetivo ayudar tanto a jugadores como a clubes, debido al vacío particular en el mercado en la Comunidad Valenciana, ya que actualmente no existe una herramienta similar capaz de resolver el mismo problema en esta región.
        </p>

        <h3>Objetivos:</h3>
        <ul>
          <li>Crear un canal directo y accesible para la interacción entre futbolistas y equipos.</li>
          <li>Promover el crecimiento del fútbol regional mediante la ayuda en los procesos de captación de talento.</li>
          <li>Fomentar oportunidades para jugadores que buscan integrarse en equipos locales.</li>
          <li>Facilitar a los equipos un medio para publicar sus necesidades de reclutamiento y evaluar posibles candidatos.</li>
        </ul>
        <img
            src="https://esportbase.valenciaplaza.com/wp-content/uploads/2025/03/250326LEV_Miguel-Ang-215588926-scaled-1.jpg"
            alt="Reunión FFCV"
            className="qs-img"
          />
      </div>
     
    </div>
    
  );
};

export default QuienesSomos;
