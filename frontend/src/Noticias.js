import React, { useState } from "react";
import "./Noticias.css"; 

const Noticias = () => {
  const [showMore, setShowMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
 

  const noticias = [
    {
      content: (
        <div className="noticia-castellon">
          <h2>Reclutamiento Abierto para el Juvenil B del Castellón</h2>
          <p>
            <strong>El Castellón FC</strong> está buscando nuevos talentos para reforzar su equipo{" "}
            <strong>Juvenil B</strong>, que competirá en la <strong>Liga Nacional Juvenil</strong> en la próxima
            temporada. Si eres un jugador con potencial y estás buscando un reto en una categoría de alto nivel,{" "}
            ¡esta es tu oportunidad!
          </p>
          <p>
            <strong>Requisitos:</strong> Para poder acceder a las pruebas, los jugadores deben cumplir con los
            siguientes requisitos:
          </p>
          <ul>
            <li>
              Haber jugado previamente en una categoría <strong>Juvenil Nacional</strong> o <strong>Cadete
              Nacional</strong>.
            </li>
            <li>Ser nacido entre los años <strong>2007 y 2009</strong> (esto incluye jugadores de la categoría juvenil).</li>
          </ul>
          <p>
            Si cumples con estos requisitos y tienes ganas de demostrar tu talento, el <strong>Castellón FC</strong> te
            invita a ponerte en contacto con el equipo de reclutadores para coordinar las pruebas correspondientes.
          </p>
          <p>
            <strong>Contacto:</strong> Para más información, puedes ponerte en contacto con nosotros a través del correo
            electrónico <a href="mailto:castellon@gmail.com">castellon@gmail.com</a>. Por favor, envía tu currículum deportivo y
            serás respondido en un plazo de 72 horas.
          </p>
          <p>
            ¡No pierdas esta oportunidad de formar parte de uno de los clubes más históricos de la Comunidad Valenciana y
            dar el siguiente paso en tu carrera futbolística!
          </p>
        </div>
      ),
    },
    {
      content: (
        <div className="noticia-villarreal">
          <h2 className="noticia-title">Pruebas Abiertas – Villarreal CF Juvenil Preferente</h2>
          <p>
            El <strong>Villarreal CF</strong> ha abierto el proceso de selección para reforzar su plantilla de <strong>Juvenil Preferente</strong>.
            Buscan jugadores que hayan competido en alguna categoría preferente o superior para lograr sus objetivos deportivos.
            Esta es una excelente oportunidad para unirte a un club de élite y desarrollarte en su reconocida academia.
          </p>
          <p>
            <strong>Requisitos para participar:</strong> Los jugadores interesados deben cumplir con los siguientes criterios:
          </p>
          <ul>
            <li>Categoría: <strong>Juvenil Preferente</strong></li>
            <li>Nacidos entre: <strong>2007 y 2009</strong></li>
          </ul>
          <p>
            <strong>Pruebas:</strong> Las pruebas de selección se llevarán a cabo en las instalaciones del Villarreal CF en los próximos meses.
            Los detalles de las fechas y horarios serán proporcionados a los jugadores seleccionados.
          </p>
          <p>
          <strong>Contacto:</strong> Para más información, puedes ponerte en contacto con nosotros a través del correo
          electrónico <a href="mailto:villarreal@gmail.com">villarreal@gmail.com</a>. Por favor, envía tu currículum deportivo y
          serás respondido en un plazo de 72 horas.
        </p>
          <p>
            No pierdas la oportunidad de formar parte de uno de los mejores equipos en el fútbol juvenil de España. ¡Esperamos tu candidatura!
          </p>
        </div>
      ),
    },
    {
      content: (
        <div className="noticia-valencia">
          <h2 className="noticia-title">El Valencia CF busca talentos para su Juvenil Nacional</h2>
          <p>
            El <strong>Valencia CF</strong> está en búsqueda de jugadores de alto nivel para unirse a su equipo de <strong>Juvenil Nacional</strong>.
            Esta es una oportunidad única para entrar en uno de los clubes más reconocidos de España y formar parte de su exitosa academia. 
            El Valencia CF es conocido por su excelente estructura de formación y su enfoque en el desarrollo de jóvenes futbolistas.
          </p>
          <p>
            <strong>Requisitos para los aspirantes:</strong> Los jugadores que deseen participar en el proceso de selección deben cumplir con los siguientes requisitos:
          </p>
          <ul>
            <li>Categoría: <strong>Juvenil Nacional</strong></li>
            <li>Buscan jugadores con <strong>experiencia en liga nacional</strong></li>
            <li>Edad: Jugadores nacidos entre <strong>2007 y 2009</strong></li>
          </ul>
          <p>
            <strong>Pruebas:</strong> Las pruebas para el proceso de selección tendrán lugar en las instalaciones del Valencia CF en las próximas semanas.
            Los detalles específicos sobre las fechas y horarios se enviarán a los jugadores seleccionados para las pruebas.
          </p>
          <p>
          <strong>Contacto:</strong> Para más información, puedes ponerte en contacto con nosotros a través del correo
          electrónico <a href="mailto:valencia@gmail.com">valencia@gmail.com</a>. Por favor, envía tu currículum deportivo y
          serás respondido en un plazo de 72 horas.
        </p>
          <p>
            ¡No dejes pasar esta oportunidad de formar parte del Valencia CF y dar el siguiente paso en tu carrera futbolística!
          </p>
        </div>
      ),
    },
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % noticias.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + noticias.length) % noticias.length
    );
  };


  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="noticias-wrapper">

      <h1 className="noticias-title">NOTICIAS</h1>

      <div className="noticias-container">
        <p>
          En este apartado podrás encontrar las noticias más importantes sobre los
          clubes que colaboran con nuestra plataforma. Aquí nos aseguramos de mantenerte
          actualizado con la información más relevante acerca de los eventos, logros y actividades
          de los clubes que forman parte de nuestra comunidad.
        </p>

        <p className="info-text" onClick={handleToggle}>
          {showMore ? "Ver menos" : "Más información..."}
        </p>

        {showMore && (
          <div className="extra-info">
            <p>
              Si eres un club y te gustaría añadir una noticia para mantener a tu comunidad al tanto
              de tus novedades, ¡nos encantaría colaborar contigo! Puedes ponerte en contacto con nosotros
              enviando un correo electrónico a <a href="mailto:ffcvconnect@gmail.com">ffcvconnect@gmail.com </a>  
               y estaremos encantados de ayudarte a compartir tus noticias con el mundo.
            </p>
            <p>
              ¡No dudes en unirte a nosotros y ser parte de este proyecto que conecta a los clubes y sus
              seguidores! Te esperamos con las puertas abiertas para colaborar.
            </p>
          </div>
        )}
      </div>
    
      <h2 className="ofertas-destacadas-title">OFERTAS DESTACADAS</h2>

      <div className="noticias-carousel">
        <span className="carousel-arrow" onClick={goToPrevious}>
          &#8592; {/* Flecha izquierda */}
        </span>

        <div className="noticia-item active">
          <h2>{noticias[currentIndex].title}</h2>
          <div>{noticias[currentIndex].content}</div>
        </div>

        <span className="carousel-arrow" onClick={goToNext}>
          &#8594; {/* Flecha derecha */}
        </span>
      </div>

     

      <h2 className="captacion-ffcv-title">Captación FFCV</h2>
      <div className="noticia-captacion">
        <p><strong>Los ojeadores de clubes de toda España, presentes en la jornada de captación organizada por la FFCV</strong></p>
        <p><strong>Miércoles, 10 de abril de 2025</strong> | Por Prensa FFCV</p>
        <p>
          El Comité Técnico de Entrenadores de la Federación de Fútbol de la Comunidad Valenciana ha organizado una jornada de captación muy especial, que tendrá lugar el próximo sábado 27 de julio en las instalaciones del Polideportivo Municipal de Picassent. Esta actividad está abierta a futbolistas de categorías infantil, cadete y juvenil.
        </p>
        <p>
          📌 Todos los participantes deberán inscribirse previamente enviándonos un correo a <a href="mailto:captacionffcv@gmail.com">captacionffcv@gmail.com</a> con su currículum de FFCV Connect. Si son seleccionados, serán contactados.
        </p>

        <div className="imagenes-noticia">
          <img 
            src="https://esportbase.valenciaplaza.com/wp-content/uploads/2019/11/DSC03688-1024x576.jpg" 
            alt="Jornada de captación" 
            className="imagen-noticia" 
          />
          <img 
            src="https://ffcv.es/wp/wp-content/uploads/2022/06/gol1.jpeg" 
            alt="Prueba de futbolistas" 
            className="imagen-noticia" 
          />
        </div>

        {!showMore && (
          <p className="leer-mas" onClick={handleToggle}>
            Leer más...
          </p>
        )}

        {showMore && (
          <>
            <p>
              Lo que hace especialmente relevante esta jornada es la presencia confirmada de ojeadores y técnicos de clubes de primer nivel nacional, entre ellos representantes de Valencia CF, Villarreal CF, Levante UD, Elche CF, y clubes de LaLiga como el Sevilla FC y el Real Betis Balompié.
            </p>
            <p>
              Durante la jornada, se realizarán diferentes pruebas técnicas y tácticas, así como partidos cortos de observación. Esta es una oportunidad única para que los jóvenes talentos muestren su potencial frente a los responsables de captación de los principales equipos españoles.
            </p>
            <p>
              💬 "Queremos ofrecer a nuestros jóvenes futbolistas el escenario perfecto para crecer y hacerse visibles. Esta jornada de captación puede cambiar el futuro deportivo de muchos de ellos", ha declarado Antonio García, coordinador del departamento de captación de la FFCV.
            </p>
            <p>
              📍 Fecha: Sábado, 27 de julio de 2025
              <br />
              🕒 Hora: A partir de las 10:00h
              <br />
              📍 Lugar: Polideportivo Municipal de Picassent
              <br />
              📋 Inscripción: Abierta hasta el 31 de mayo a las 23:59h
            </p>
            <p><strong>Categorías convocadas:</strong></p>
            <ul>
              <li>Infantil (nacidos 2012–2013)</li>
              <li>Cadete (nacidos 2010–2011)</li>
              <li>Juvenil (nacidos 2007–2009)</li>
            </ul>

            <p className="leer-mas" onClick={handleToggle}>
              Leer menos...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Noticias;
