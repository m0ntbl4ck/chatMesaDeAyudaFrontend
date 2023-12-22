import { useForm } from "react-hook-form"; // Importa el hook useForm para manejar formularios
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import { useEffect, useState } from "react"; // Importa useEffect y useState de React
import { useNavigate } from "react-router-dom"; // Importa useNavigate de React Router

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Utiliza useForm para el manejo del formulario
  const { singup, isAutheticated, errors: registerErrors } = useAuth(); // Obtiene funciones y datos de autenticación del contexto
  const navigate = useNavigate(); // Obtiene la función navigate de React Router
  const [showErrors, setShowErrors] = useState(true); // Estado para mostrar errores

  // Redirige a la página de perfil si ya está autenticado
  useEffect(() => {
    if (isAutheticated) navigate("/profile");
  }, [isAutheticated]);

  // Oculta los errores después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowErrors(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Maneja el envío del formulario al registrar un usuario
  const onSubmit = handleSubmit(async (values) => {
    singup(values); // Llama a la función de registro del contexto de autenticación
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-4 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl mb-4 text-center font-bold text-center">Registro - Chat de Mesa de Ayuda</h2>
        {/* Renderiza los errores en caso de que showErrors sea verdadero */}
        {showErrors && registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Campos del formulario */}
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md placeholder-gray-400"
            placeholder="Nombre de Usuario"
          />
          {errors.username && (
            <p className="text-red-500">El usuario es requerido</p>
          )}
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
          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Registro
          </button>
        </form>
        {/* Enlace para iniciar sesión */}
        <p className="mt-4 text-center">
          ¿Ya tienes una cuenta?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
