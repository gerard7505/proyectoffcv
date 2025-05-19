import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ofertas.css';

const Ofertas = () => {
  const [ofertas, setOfertas] = useState([]);
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [verTodas, setVerTodas] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [verFavoritas, setVerFavoritas] = useState(false);

  const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUsuario(userData);

      if (userData.tipo_usuario === 'Jugador') {
        axios
          .get(`http://localhost:8000/api/ofertas/favoritos/${userData.id}`)
          .then((response) => {
            const favoritosIds = response.data.map((oferta) => oferta.id);
            setFavoritos(favoritosIds);
          })
          .catch((error) => {
            console.error('Error al obtener favoritos:', error);
          });
      }
    }

    const fetchOfertas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/ofertas');
        const ofertasData = response.data;
        setOfertas(ofertasData);

        const categoriasUnicas = [
          ...new Set(ofertasData.map((oferta) => oferta.categoria)),
        ];
        setCategorias(categoriasUnicas);
        setError(null);
      } catch (error) {
        console.error('Hubo un error al obtener las ofertas:', error);
        setError('No se pudieron cargar las ofertas, por favor intente más tarde.');
      }
    };

    fetchOfertas();
  }, []);

  const esAdmin = usuario && usuario.email.toLowerCase() === 'admin@gmail.com';
  const esJugador = usuario && usuario.tipo_usuario === 'Jugador';

  const toggleFavorito = async (ofertaId) => {
    if (!usuario) {
      alert('Tienes que iniciar sesión para marcar favoritos.');
      return;
    }

    try {
      if (favoritos.includes(ofertaId)) {
        await axios.delete('http://localhost:8000/api/ofertas/favorito', {
          data: { jugador_id: usuario.id, oferta_id: ofertaId },
        });
        setFavoritos((prev) => prev.filter((id) => id !== ofertaId));
      } else {
        await axios.post('http://localhost:8000/api/ofertas/favorito', {
          jugador_id: usuario.id,
          oferta_id: ofertaId,
        });
        setFavoritos((prev) => [...prev, ofertaId]);
      }
    } catch (err) {
      console.error('Error al actualizar favoritos:', err);
      alert('No se pudo actualizar favoritos. Inténtalo de nuevo.');
    }
  };

  const mostrarDetalles = (oferta) => {
    setOfertaSeleccionada(oferta);
  };

  const cerrarOferta = () => {
    setOfertaSeleccionada(null);
  };

  const eliminarOferta = async (id) => {
    if (esAdmin) {
      try {
        await axios.delete(`http://localhost:8000/api/ofertas/${id}`);
        setOfertas(ofertas.filter((oferta) => oferta.id !== id));
        setOfertaSeleccionada(null);
      } catch (error) {
        console.error('Hubo un error al eliminar la oferta:', error);
        alert('No se pudo eliminar la oferta.');
      }
    } else {
      alert('No tienes permisos para eliminar esta oferta.');
    }
  };

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const ofertasFiltradas = ofertas.filter((oferta) => {
    const coincideCategoria = categoriaSeleccionada
      ? oferta.categoria === categoriaSeleccionada
      : true;
    const coincideBusqueda = oferta.titulo.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const ofertasOrdenadas = ofertasFiltradas.sort((a, b) =>
    a.titulo.localeCompare(b.titulo)
  );

  const ofertasFavoritas = ofertasOrdenadas.filter((oferta) =>
    favoritos.includes(oferta.id)
  );

  const ofertasParaMostrar = verFavoritas
    ? ofertasFavoritas
    : verTodas
    ? ofertasOrdenadas
    : ofertasOrdenadas.slice(0, 5);

  return (
    <div className="ofertas-container">
      <h1>OFERTAS</h1>

      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar oferta por título..."
          value={busqueda}
          onChange={handleBusquedaChange}
        />
      </div>

      <div className="filtro-categoria">
        <select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
          <option value="">Todas las categorías</option>
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="filtro-favoritos">
        {!verFavoritas && (
          <button
            onClick={() => setVerTodas(!verTodas)}
            style={{ marginBottom: '10px' }}
          >
            {verTodas ? 'Ver menos ofertas' : 'Ver todas las ofertas'}
          </button>
        )}

        <div style={{ margin: '10px 0' }} />

        {esJugador && (
          <button onClick={() => setVerFavoritas(!verFavoritas)}>
            {verFavoritas ? 'Ver todas las ofertas' : 'Ver mis favoritas'}
          </button>
        )}
      </div>

      {error && <div className="error">{error}</div>}

      {ofertasOrdenadas.length > 0 ? (
        <ul>
          {ofertasParaMostrar.map((oferta) => (
            <li key={oferta.id}>
              <h2 onClick={() => mostrarDetalles(oferta)}>{oferta.titulo}</h2>

              {ofertaSeleccionada && ofertaSeleccionada.id === oferta.id && (
                <div className="details">
                  <h3>Detalles de la oferta</h3>
                  <p><strong>Título:</strong> {ofertaSeleccionada.titulo}</p>
                  <p><strong>Descripción:</strong> {ofertaSeleccionada.descripcion}</p>
                  <p><strong>Fecha de inicio:</strong> {formatearFecha(ofertaSeleccionada.fecha_inicio)}</p>
                  <p><strong>Fecha de fin:</strong> {formatearFecha(ofertaSeleccionada.fecha_fin)}</p>
                  <p><strong>Categoría:</strong> {ofertaSeleccionada.categoria}</p>

                  <button className="close" onClick={cerrarOferta}>Cerrar</button>

                  {esAdmin && (
                    <button className="delete" onClick={() => eliminarOferta(ofertaSeleccionada.id)}>
                      Eliminar
                    </button>
                  )}
                </div>
              )}

{esJugador && (
  <span
    className={`estrella-favorito ${favoritos.includes(oferta.id) ? 'activo' : ''}`}
    onClick={() => toggleFavorito(oferta.id)}
    title={favoritos.includes(oferta.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
  >
    ★
  </span>
)}

            </li>
          ))}
        </ul>
      ) : (
        <p className="no-ofertas">No hay ofertas disponibles en este momento.</p>
      )}
    </div>
  );
};

export default Ofertas;
