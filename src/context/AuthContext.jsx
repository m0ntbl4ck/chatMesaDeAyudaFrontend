import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
  getMessagesRequest
} from '../api/auth'; // Importa funciones para realizar solicitudes de autenticación
import Cookies from 'js-cookie'; // Importa la librería 'js-cookie' para manejar cookies

export const AuthContext = createContext(); // Crea el contexto de autenticación

export const useAuth = () => {
  const context = useContext(AuthContext); // Utiliza el contexto de autenticación

  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para registrar un usuario
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  // Función para iniciar sesión
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await logoutRequest();
      setIsAuthenticated(false);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  // Función para obtener mensajes
  const getMessages = async (user) => {
    try {
      await getMessagesRequest(user);
      setIsAuthenticated(false);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{
      signup,
      signin,
      logout,
      getMessages,
      user,
      isAuthenticated,
      errors,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
