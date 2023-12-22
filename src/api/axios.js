import axios from "axios"; // Importa el módulo 'axios' para realizar solicitudes HTTP

// Crea una instancia de axios con configuraciones personalizadas
const instance = axios.create({
  baseURL: "http://localhost:4000/api", // Establece la URL base para las solicitudes
  withCredentials: true, // Habilita el envío de cookies en las solicitudes
});

export default instance; // Exporta la instancia personalizada de axios
