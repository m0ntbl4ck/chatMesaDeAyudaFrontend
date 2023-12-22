import { useForm } from 'react-hook-form'; // Importa el hook useForm para el manejo de formularios
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación
import { useEffect, useState } from "react"; // Importa useEffect y useState para efectos y estados
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Usa el hook useForm para registrar campos del formulario
  const { signin, isAutheticated, errors: signinErrors } = useAuth(); // Obtiene funciones y estados de autenticación del contexto
  const navigate = useNavigate(); // Obtiene la función de navegación
  const [showErrors, setShowErrors] = useState(true); // Estado para mostrar errores

  // Redirige al perfil si ya está autenticado
  useEffect(() => {
    if (isAutheticated) navigate("/profile");
  }, [isAutheticated]);

  // Oculta los errores después de un tiempo determinado
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowErrors(false);
    }, 5000); // Ocultar después de 5 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, []);

  // Función que maneja el envío del formulario al iniciar sesión
  const onSubmit = handleSubmit((data) => {
    signin(data); // Llama a la función de inicio de sesión del contexto
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-4 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl mb-4 text-center font-bold">Inicio de Sesión - Chat de Mesa de Ayuda</h2>
        {showErrors && signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md placeholder-gray-400"
            placeholder="Correo Electrónico"
          />
          {errors.email && (
            <p className="text-red-500">El email es requerido</p>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md placeholder-gray-400"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500">La contraseña es requerida</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ¿No estás registrado?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
