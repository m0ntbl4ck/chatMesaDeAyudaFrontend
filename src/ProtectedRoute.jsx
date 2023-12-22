import { Navigate, Outlet } from 'react-router-dom'; // Importa Navigate y Outlet de React Router
import { useAuth } from "./context/AuthContext"; // Importa el contexto de autenticación

function ProtectedRoute() {
  const { loading, isAutheticated } = useAuth(); // Obtiene el estado de carga y autenticación del contexto

  // Muestra un mensaje de carga si está en proceso de autenticación
  if (loading) return <h1>Loading...</h1>;

  // Redirige a la página de inicio de sesión si no está autenticado
  if (!loading && !isAutheticated) return <Navigate to='/login' replace />;

  // Renderiza el contenido protegido si está autenticado
  return <Outlet />;
}

export default ProtectedRoute;
