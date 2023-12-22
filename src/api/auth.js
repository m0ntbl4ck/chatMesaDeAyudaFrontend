import axios from "./axios"; // Importa el cliente axios configurado

// Realiza una solicitud para registrar un usuario
export const registerRequest = (user) => axios.post(`/register`, user);

// Realiza una solicitud para iniciar sesión de usuario
export const loginRequest = (user) => axios.post(`/login`, user);

// Realiza una solicitud para verificar el token de autenticación
export const verifyTokenRequest = () => axios.get(`/verify`);

// Realiza una solicitud para cerrar sesión del usuario
export const logoutRequest = () => axios.post(`/logout`);

// Realiza una solicitud para obtener los mensajes de un usuario
export const getMessagesRequest = (user) => axios.get(`/messages`, user);
