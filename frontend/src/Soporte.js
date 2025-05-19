import React, { useState } from 'react';
import './Soporte.css';

const preguntas = [
    {
      pregunta: "¿Puedo contactar con los clubes directamente?",
      respuesta:
        "Sí, puedes ponerte en contacto directamente con los clubes a través de las ofertas que publican en la plataforma. Los detalles de contacto estarán disponibles en cada oferta."
    },
    {
      pregunta: "¿Cómo puedo buscar ofertas de un club en concreto?",
      respuesta:
        "A través del buscador de ofertas, busca el nombre del club y, si ese club tiene ofertas activas, te aparecerán."
    },
    {
      pregunta: "¿Cómo puedo buscar ofertas de una categoría en concreto?",
      respuesta:
        "A través del filtro para seleccionar categoría en ofertas. Ahí te aparecerán todas las categorías disponibles. Además, en el buscador también podrás buscar la categoría."
    },
    {
      pregunta: "¿Todos los servicios de la web son gratuitos?",
      respuesta:
        "Sí, los servicios son completamente gratuitos, tanto para jugadores como para clubes."
    },
    {
      pregunta: "¿Cómo puedo ponerme en contacto con vosotros?",
      respuesta:
        "Puedes contactarnos directamente a través de nuestro correo oficial: ffcvconnect@gmail.com."
    },
    {
      pregunta: "¿Cómo puedo añadir una noticia?",
      respuesta:
        "Si eres un club, mándanos un correo a ffcvconnect y te daremos los pasos necesarios para que creemos tu noticia."
    },
    {
      pregunta: "¿Cuánto tardarán en contestar los clubes a mi currículum?",
      respuesta:
        "Un máximo de 72 horas."
    },
    {
      pregunta: "¿Cómo creo mi currículum?",
      respuesta:
        "Debes descargar el archivo del currículum en la sección de inicio, rellenarlo con tus datos verídicos y mandárselo al club al que quieras unirte."
    },
    {
      pregunta: "¿Sin currículum puedo presentar mi candidatura a los clubes o pruebas de FFCV?",
      respuesta:
        "No, si no envías tu currículum será imposible que acepten tu oferta."
    },
    {
      pregunta: "¿Que pasa si miento en mi currículum deportivo?",
      respuesta:
        "Todos los equipos investigan la veracidad de los currículums a traves de las herramientas de FFCV, si mientes seras rechazado al momento."
    },
    {
      pregunta: "¿Como añado ofertas a favoritas?",
      respuesta:
        "Simplemenete le tienes que dar a la estrella de cada oferta respectivamente."
    },
    {
      pregunta: "¿Como veo mis ofertas favoritas?",
      respuesta:
        "En el apartado ofertas, tienes un boton con el cual aparecen solo las ofertas favoritas."
    },
    {
      pregunta: "¿Es recomendable añadir videos de jugadas?",
      respuesta:
        "Sí, totalmente recomendable. Tienes un apartado en el currículum en el que puedes añadir tus videos."
    }
  ];

const Soporte = () => {
  const [busqueda, setBusqueda] = useState("");
  const preguntasFiltradas = preguntas.filter((item) =>
    item.pregunta.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="soporte-wrapper">
      <h2 className="soporte-title">PREGUNTAS FRECUENTES</h2>

      <input
        type="text"
        className="soporte-buscador"
        placeholder="Buscar una pregunta..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

<div className="soporte-content">
  {preguntasFiltradas.length > 0 ? (
    preguntasFiltradas.map((item, index) => (
      <div key={index} className="pregunta-box">
        <h3>{index + 1}. {item.pregunta}</h3>
        <p>{item.respuesta}</p>
      </div>
    ))
  ) : (
    <p>No se encontraron resultados.</p>
  )}
</div>

    </div>
  );
};

export default Soporte;
