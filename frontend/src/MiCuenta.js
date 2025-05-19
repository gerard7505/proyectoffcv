import React, { useEffect, useState } from "react";
import "./MiCuenta.css";

const MiCuenta = ({ user, userProfile, handleLogout }) => {
  const storedUser = user || JSON.parse(localStorage.getItem("user"));
  const [profileData, setProfileData] = useState(userProfile);

  useEffect(() => {
    if (storedUser?.type === "Admin") {
      setProfileData({ ...storedUser });
      return;
    }

    if (!profileData && storedUser) {
      const token = localStorage.getItem("token");
      const email = storedUser.email;
      let apiUrl = "";

      if (storedUser.type === "Jugador") {
        apiUrl = `http://localhost:8000/api/jugadores/email/${email}`;
      } else if (storedUser.type === "Club") {
        apiUrl = `http://localhost:8000/api/clubs/email/${email}`;
      }

      if (token && email && apiUrl) {
        fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then(async (res) => {
            const contentType = res.headers.get("content-type");
            if (!res.ok || !contentType || !contentType.includes("application/json")) {
              return null;
            }
            return await res.json();
          })
          .then((data) => {
            if (data && !data.error) {
              setProfileData({ ...data, type: storedUser.type });
            }
          })
          .catch((err) => {
            console.error("Error al cargar el perfil:", err.message);
          });
      }
    }
  }, [profileData, storedUser]);

  if (!storedUser) {
    return (
      <div className="mi-cuenta-container">
        <h1>No has iniciado sesión</h1>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="mi-cuenta-container">
        <p>Cargando datos del perfil...</p>
      </div>
    );
  }

  return (
    <div className="mi-cuenta-container">
      <h1>Bienvenido, {profileData.name}!</h1>

      {profileData.type === "Jugador" && (
        <>
          <p><strong>Nombre:</strong> {profileData.name}</p>
          <p><strong>Apellido:</strong> {profileData.lastName}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>DNI:</strong> {profileData.dni}</p>
          <p><strong>Dirección:</strong> {profileData.address}</p>
          <p><strong>Ciudad:</strong> {profileData.city}</p>
          <p><strong>Fecha de nacimiento:</strong> {profileData.dateOfBirth}</p>
        </>
      )}

      {profileData.type === "Club" && (
        <>
          <p><strong>Nombre del Club:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Ciudad:</strong> {profileData.city}</p>
        </>
      )}

      {profileData.type === "Admin" && (
        <>
          <p><strong>Nombre:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
        </>
      )}

      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
    </div>
  );
};

export default MiCuenta;
