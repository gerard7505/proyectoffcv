import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./App.css";
import Inicio from "./Inicio";
import Noticias from "./Noticias";
import Ofertas from "./Ofertas";
import MiCuenta from "./MiCuenta";
import QuienesSomos from "./QuienesSomos";
import Historia from "./Historia";
import Soporte from "./Soporte";
import Testimonios from "./Testimonios";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    dni: "",
    address: "",
    city: "",
    dateOfBirth: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState("inicio");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
  
    if (!userType) {
      setError("Por favor, selecciona un tipo de usuario.");
      return;
    }
  
    let apiUrl = "";
    if (userType === "Jugador") {
      apiUrl = "http://localhost:8000/api/jugadores/login";
    } else if (userType === "Club") {
      apiUrl = "http://localhost:8000/api/clubs/login";
    } else if (userType === "Admin") {
      apiUrl = "http://127.0.0.1:8000/api/admins/login";
    }
  
    const userData = { email, password };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        const errorMsg = result?.error || result?.detail || result?.message || "Error en el inicio de sesión";
        throw new Error(errorMsg);
      }
  
      const loggedUser = {
        id: result.id,
        name: result.name,
        email: result.email,
        type: userType,
      };
  
      setUser(loggedUser);
      setUserEmail(result.email);
      setIsAuthenticated(true);
      setMessage("Sesión iniciada correctamente.");
      setEmail("");
      setPassword("");
      setUserType("");
      localStorage.setItem("user", JSON.stringify({ ...loggedUser, tipo_usuario: userType }));
    } catch (err) {
      setError("Hubo un problema con el inicio de sesión. Inténtalo de nuevo.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setUserEmail("");
    setMessage("Has cerrado sesión correctamente.");
    setUserProfile(null);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!userType) {
      setError("Por favor, selecciona un tipo de usuario.");
      return;
    }
    let apiUrl = "";
    let userData = {};
    if (userType === "Jugador") {
      apiUrl = "http://127.0.0.1:8000/api/jugadores";
      userData = { ...formData, email, password };
    } else if (userType === "Club") {
      apiUrl = "http://127.0.0.1:8000/api/clubs";
      userData = { name: formData.name, email, city: formData.city, password };
    }
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error en el registro");
      }
      setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
      setEmail("");
      setPassword("");
      setUserType("");
      setFormData({
        name: "",
        lastName: "",
        dni: "",
        address: "",
        city: "",
        dateOfBirth: "",
        password: "",
      });
      setIsRegistering(false);
    } catch (err) {
      setError("Hubo un problema con el registro. Inténtalo de nuevo.");
    }
  };

 
  return (
    <div className="container">
        <main className="main-content">
        <div className="centered-content">
      {isAuthenticated ? (
        <div className="contact-bar">
          <div className="center-section">
            <nav className="navigation">
              <ul>
                <li><button onClick={() => setCurrentPage("inicio")}>INICIO</button></li>
                <li><button onClick={() => setCurrentPage("noticias")}>NOTICIAS</button></li>
                <li><button onClick={() => setCurrentPage("ofertas")}>OFERTAS</button></li>
                <li><button onClick={() => setCurrentPage("testimonios")}>TESTIMONIOS</button></li>
                <li><button onClick={() => setCurrentPage("soporte")}>SOPORTE</button></li>
                <li>
                  <button className="account-button" onClick={() => setCurrentPage("miCuenta")}>
                    MI CUENTA
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <div classNam e="contact-bar">
          <div className="center-section">
             <p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ffcvconnect@gmail.com"
                className="custom-link"
              >
                Contact Us: ffcvconnect@gmail.com
              </a>
            </p>
          </div>
        </div>
      )}
      <div class="container-img">
  <img class="img1" src="/ffcvconnect.png" alt="FFCV Connect" />
</div>

     {isAuthenticated && (
  <div className="main-container">
  {currentPage === "inicio" && <Inicio />}
  {currentPage === "noticias" && <Noticias />}
  {currentPage === "testimonios" && <Testimonios />}
  {currentPage === "soporte" && <Soporte />}
  {currentPage === "miCuenta" && <MiCuenta user={user} userProfile={userProfile} handleLogout={handleLogout} />}
  {currentPage === "ofertas" && <Ofertas usuario={user} />}
  {currentPage === "quienesSomos" && <QuienesSomos />}
    {currentPage === "historia" && <Historia />}
</div>
)}

{!isAuthenticated && (
  <div className="form-container">
    <h2>{isRegistering ? "Registro" : "Iniciar Sesión"}</h2>
    {isRegistering ? (
      <>
        <form onSubmit={handleRegisterSubmit} className="form">
          <div className="user-role-selection">
            <label>Selecciona el tipo de usuario:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="role-dropdown"
            >
              <option value="">--Seleccionar--</option>
              <option value="Jugador">Jugador</option>
              <option value="Club">Club</option>
            </select>
          </div>
          {userType && (
            <>
              {userType === "Jugador" && (
                <>
                  <div className="input-group">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Apellido:</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      placeholder="Tu apellido"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>DNI:</label>
                    <input
                      type="text"
                      value={formData.dni}
                      onChange={(e) =>
                        setFormData({ ...formData, dni: e.target.value })
                      }
                      placeholder="DNI"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Dirección:</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Dirección"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Ciudad:</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Ciudad"
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Fecha de nacimiento:</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        setFormData({ ...formData, dateOfBirth: e.target.value })
                      }
                      required
                    />
                  </div>
                </>
              )}
              {userType === "Club" && (
                <>
                  <div className="input-group">
                    <label>Nombre del Club:</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Nombre del Club"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Ciudad:</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="Ciudad"
                      required
                    />
                  </div>
                </>
              )}
              <div className="input-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  required
                />
              </div>
              <div className="input-group">
                <label>Contraseña:</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="submit-button">
                Registrarse
              </button>
              <div className="toggle-link">
                <p>
                  ¿Ya tienes cuenta?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegistering(false);
                      setMessage("");
                      setError("");
                    }}
                  >
                    Inicia sesión aquí
                  </a>
                </p>
              </div>
            </>
          )}
        </form>
      </>
    ) : (
      <>
        <form onSubmit={handleLoginSubmit} className="form">
          <div className="user-role-selection">
            <label>Selecciona el tipo de usuario:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="role-dropdown"
            >
              <option value="">--Seleccionar--</option>
              <option value="Jugador">Jugador</option>
              <option value="Club">Club</option>
              <option value="Admin">Admin</option>
            </select>
            
          </div>
          {userType && (
            <>
              <div className="input-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  required
                />
              </div>
              <div className="input-group">
                <label>Contraseña:</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="submit-button">
                Iniciar sesión
              </button>
              <div className="toggle-link">
                <p>
                  ¿No tienes cuenta?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegistering(true);
                      setMessage("");
                      setError("");
                    }}
                  >
                    Regístrate aquí
                  </a>
                </p>
              </div>            
                  </>
                )}
              </form>
            </>
          )}

          {error && <div className="error">{error}</div>}
          {message && <div className="message">{message}</div>}
        </div>
      )}
       </div>
</main>
<footer>
  <div class="footer-container">
    <div class="footer-column">
      <h3>Sobre nosotros</h3>
      <ul>
        <li><a href="#" onClick={() => setCurrentPage("quienesSomos")}>Quiénes somos</a></li>
        <li><a href="#" onClick={() => setCurrentPage("historia")}>Historia</a></li>
      </ul>
    </div>

    <div class="footer-column">
      <h3>Contacto</h3>
      <ul>
      <li>
  Email: <a href="mailto:ffcvconnect@gmail.com">ffcvconnect@gmail.com</a>
</li>
        <li>Teléfono: +34 644 84 86 58</li>
        <li>Dirección: Calle Valencia-late, número 4, 12539 Les Alqueries, Castellón</li>
      </ul>
    </div>

    <div class="footer-column">
      <h3>Síguenos</h3>
      <ul>
        <li><a href="https://www.facebook.com/FFCV.es/?locale=ca_ES" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        <li><a href="https://www.instagram.com/ffcv_info/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://x.com/FFCV_info?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        <li><a href="https://www.youtube.com/@ffcv_info" target="_blank" rel="noopener noreferrer">YouTube</a></li>
      </ul>
    </div>

    <div class="footer-column footer-logo">
      <img src="https://ffcv.es/wp/wp-content/uploads/2019/09/logo_ffcv_fb.png" alt="FFCV Logo" /> 
    </div>

  </div>
  <p class="footer-bottom">
    Sitio desarrollado por FFCV | Todos los derechos reservados
  </p>
</footer>
    </div>
  );
};

export default App;
